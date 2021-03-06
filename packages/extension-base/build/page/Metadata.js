// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
// External to class, this.# is not private enough (yet)
let sendRequest;
export default class Metadata {
  constructor(_sendRequest) {
    sendRequest = _sendRequest;
  }

  get() {
    return sendRequest('pub(metadata.list)');
  }

  provide(definition) {
    return sendRequest('pub(metadata.provide)', definition);
  }

}