// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { assert } from '@axia-js/util';
import { PORT_EXTENSION } from "../../defaults.js";
import Extension from "./Extension.js";
import State from "./State.js";
import Tabs from "./Tabs.js";
const state = new State();
const extension = new Extension(state);
const tabs = new Tabs(state);
export default function handler({
  id,
  message,
  request
}, port, extensionPortName = PORT_EXTENSION) {
  const isExtension = port.name === extensionPortName;
  const sender = port.sender;
  const from = isExtension ? 'extension' : sender.tab && sender.tab.url || sender.url || '<unknown>';
  const source = `${from}: ${id}: ${message}`;
  console.log(` [in] ${source}`); // :: ${JSON.stringify(request)}`);

  const promise = isExtension ? extension.handle(id, message, request, port) : tabs.handle(id, message, request, from, port);
  promise.then(response => {
    console.log(`[out] ${source}`); // :: ${JSON.stringify(response)}`);
    // between the start and the end of the promise, the user may have closed
    // the tab, in which case port will be undefined

    assert(port, 'Port has been disconnected');
    port.postMessage({
      id,
      response
    });
  }).catch(error => {
    console.log(`[err] ${source}:: ${error.message}`); // only send message back to port if it's still connected

    if (port) {
      port.postMessage({
        error: error.message,
        id
      });
    }
  });
}