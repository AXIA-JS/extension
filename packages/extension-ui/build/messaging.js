import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { PORT_EXTENSION } from '@axia-js/extension-base/defaults';
import { metadataExpand } from '@axia-js/extension-chains';
import chrome from '@axia-js/extension-inject/chrome';
import allChains from "./util/chains.js";
import { getSavedMeta, setSavedMeta } from "./MetadataCache.js";
const port = chrome.runtime.connect({
  name: PORT_EXTENSION
});
const handlers = {};
let idCounter = 0; // setup a listener for messages, any incoming resolves the promise

port.onMessage.addListener(data => {
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
});

function sendMessage(message, request, subscriber) {
  return new Promise((resolve, reject) => {
    const id = `${Date.now()}.${++idCounter}`;
    handlers[id] = {
      reject,
      resolve,
      subscriber
    };
    port.postMessage({
      id,
      message,
      request: request || {}
    });
  });
}

export async function editAccount(address, name) {
  return sendMessage('pri(accounts.edit)', {
    address,
    name
  });
}
export async function showAccount(address, isShowing) {
  return sendMessage('pri(accounts.show)', {
    address,
    isShowing
  });
}
export async function tieAccount(address, genesisHash) {
  return sendMessage('pri(accounts.tie)', {
    address,
    genesisHash
  });
}
export async function exportAccount(address, password) {
  return sendMessage('pri(accounts.export)', {
    address,
    password
  });
}
export async function exportAccounts(addresses, password) {
  return sendMessage('pri(accounts.batchExport)', {
    addresses,
    password
  });
}
export async function validateAccount(address, password) {
  return sendMessage('pri(accounts.validate)', {
    address,
    password
  });
}
export async function forgetAccount(address) {
  return sendMessage('pri(accounts.forget)', {
    address
  });
}
export async function approveAuthRequest(id) {
  return sendMessage('pri(authorize.approve)', {
    id
  });
}
export async function approveMetaRequest(id) {
  return sendMessage('pri(metadata.approve)', {
    id
  });
}
export async function cancelSignRequest(id) {
  return sendMessage('pri(signing.cancel)', {
    id
  });
}
export async function isSignLocked(id) {
  return sendMessage('pri(signing.isLocked)', {
    id
  });
}
export async function approveSignPassword(id, savePass, password) {
  return sendMessage('pri(signing.approve.password)', {
    id,
    password,
    savePass
  });
}
export async function approveSignSignature(id, signature) {
  return sendMessage('pri(signing.approve.signature)', {
    id,
    signature
  });
}
export async function createAccountExternal(name, address, genesisHash) {
  return sendMessage('pri(accounts.create.external)', {
    address,
    genesisHash,
    name
  });
}
export async function createAccountHardware(address, hardwareType, accountIndex, addressOffset, name, genesisHash) {
  return sendMessage('pri(accounts.create.hardware)', {
    accountIndex,
    address,
    addressOffset,
    genesisHash,
    hardwareType,
    name
  });
}
export async function createAccountSuri(name, password, suri, type, genesisHash) {
  return sendMessage('pri(accounts.create.suri)', {
    genesisHash,
    name,
    password,
    suri,
    type
  });
}
export async function createSeed(length, type) {
  return sendMessage('pri(seed.create)', {
    length,
    type
  });
}
export async function getAllMetatdata() {
  return sendMessage('pri(metadata.list)');
}
export async function getMetadata(genesisHash, isPartial = false) {
  if (!genesisHash) {
    return null;
  }

  let request = getSavedMeta(genesisHash);

  if (!request) {
    request = sendMessage('pri(metadata.get)', genesisHash || null);
    setSavedMeta(genesisHash, request);
  }

  const def = await request;

  if (def) {
    return metadataExpand(def, isPartial);
  } else if (isPartial) {
    const chain = allChains.find(chain => chain.genesisHash === genesisHash);

    if (chain) {
      return metadataExpand(_objectSpread(_objectSpread({}, chain), {}, {
        specVersion: 0,
        tokenDecimals: 15,
        tokenSymbol: 'Unit',
        types: {}
      }), isPartial);
    }
  }

  return null;
}
export async function rejectAuthRequest(id) {
  return sendMessage('pri(authorize.reject)', {
    id
  });
}
export async function rejectMetaRequest(id) {
  return sendMessage('pri(metadata.reject)', {
    id
  });
}
export async function subscribeAccounts(cb) {
  return sendMessage('pri(accounts.subscribe)', null, cb);
}
export async function subscribeAuthorizeRequests(cb) {
  return sendMessage('pri(authorize.requests)', null, cb);
}
export async function getAuthList() {
  return sendMessage('pri(authorize.list)');
}
export async function toggleAuthorization(url) {
  return sendMessage('pri(authorize.toggle)', url);
}
export async function subscribeMetadataRequests(cb) {
  return sendMessage('pri(metadata.requests)', null, cb);
}
export async function subscribeSigningRequests(cb) {
  return sendMessage('pri(signing.requests)', null, cb);
}
export async function validateSeed(suri, type) {
  return sendMessage('pri(seed.validate)', {
    suri,
    type
  });
}
export async function validateDerivationPath(parentAddress, suri, parentPassword) {
  return sendMessage('pri(derivation.validate)', {
    parentAddress,
    parentPassword,
    suri
  });
}
export async function deriveAccount(parentAddress, suri, parentPassword, name, password, genesisHash) {
  return sendMessage('pri(derivation.create)', {
    genesisHash,
    name,
    parentAddress,
    parentPassword,
    password,
    suri
  });
}
export async function windowOpen(path) {
  return sendMessage('pri(window.open)', path);
}
export async function jsonGetAccountInfo(json) {
  return sendMessage('pri(json.account.info)', json);
}
export async function jsonRestore(file, password) {
  return sendMessage('pri(json.restore)', {
    file,
    password
  });
}
export async function batchRestore(file, password) {
  return sendMessage('pri(json.batchRestore)', {
    file,
    password
  });
}
export async function setNotification(notification) {
  return sendMessage('pri(settings.notification)', notification);
}