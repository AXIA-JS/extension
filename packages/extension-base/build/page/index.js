// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Injected from "./Injected.js"; // when sending a message from the injector to the extension, we
//  - create an event - this we send to the loader
//  - the loader takes this event and uses port.postMessage to background
//  - on response, the loader creates a reponse event
//  - this injector, listens on the events, maps it to the original
//  - resolves/rejects the promise with the result (or sub data)

const handlers = {};
let idCounter = 0; // a generic message sender that creates an event, returning a promise that will
// resolve once the event is resolved (by the response listener just below this)

export function sendMessage(message, request, subscriber) {
  return new Promise((resolve, reject) => {
    const id = `${Date.now()}.${++idCounter}`;
    handlers[id] = {
      reject,
      resolve,
      subscriber
    };
    const transportRequestMessage = {
      id,
      message,
      origin: 'page',
      request: request || null
    };
    window.postMessage(transportRequestMessage, '*');
  });
} // the enable function, called by the dapp to allow access

export async function enable(origin) {
  await sendMessage('pub(authorize.tab)', {
    origin
  });
  return new Injected(sendMessage);
} // redirect users if this page is considered as phishing, otherwise return false

export async function redirectIfPhishing() {
  const res = await sendMessage('pub(phishing.redirectIfDenied)');
  return res;
}
export function handleResponse(data) {
  const handler = handlers[data.id];

  if (!handler) {
    console.error(`Unknown response: ${JSON.stringify(data)}`);
    return;
  }

  if (!handler.subscriber) {
    delete handlers[data.id];
  }

  if (data.subscription) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    handler.subscriber(data.subscription);
  } else if (data.error) {
    handler.reject(new Error(data.error));
  } else {
    handler.resolve(data.response);
  }
}