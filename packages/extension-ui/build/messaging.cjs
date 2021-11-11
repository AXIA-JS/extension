"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editAccount = editAccount;
exports.showAccount = showAccount;
exports.tieAccount = tieAccount;
exports.exportAccount = exportAccount;
exports.exportAccounts = exportAccounts;
exports.validateAccount = validateAccount;
exports.forgetAccount = forgetAccount;
exports.approveAuthRequest = approveAuthRequest;
exports.approveMetaRequest = approveMetaRequest;
exports.cancelSignRequest = cancelSignRequest;
exports.isSignLocked = isSignLocked;
exports.approveSignPassword = approveSignPassword;
exports.approveSignSignature = approveSignSignature;
exports.createAccountExternal = createAccountExternal;
exports.createAccountHardware = createAccountHardware;
exports.createAccountSuri = createAccountSuri;
exports.createSeed = createSeed;
exports.getAllMetatdata = getAllMetatdata;
exports.getMetadata = getMetadata;
exports.rejectAuthRequest = rejectAuthRequest;
exports.rejectMetaRequest = rejectMetaRequest;
exports.subscribeAccounts = subscribeAccounts;
exports.subscribeAuthorizeRequests = subscribeAuthorizeRequests;
exports.getAuthList = getAuthList;
exports.toggleAuthorization = toggleAuthorization;
exports.subscribeMetadataRequests = subscribeMetadataRequests;
exports.subscribeSigningRequests = subscribeSigningRequests;
exports.validateSeed = validateSeed;
exports.validateDerivationPath = validateDerivationPath;
exports.deriveAccount = deriveAccount;
exports.windowOpen = windowOpen;
exports.jsonGetAccountInfo = jsonGetAccountInfo;
exports.jsonRestore = jsonRestore;
exports.batchRestore = batchRestore;
exports.setNotification = setNotification;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _defaults = require("@axia-js/extension-base/defaults");

var _extensionChains = require("@axia-js/extension-chains");

var _chrome = _interopRequireDefault(require("@axia-js/extension-inject/chrome"));

var _chains = _interopRequireDefault(require("./util/chains.cjs"));

var _MetadataCache = require("./MetadataCache.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const port = _chrome.default.runtime.connect({
  name: _defaults.PORT_EXTENSION
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

async function editAccount(address, name) {
  return sendMessage('pri(accounts.edit)', {
    address,
    name
  });
}

async function showAccount(address, isShowing) {
  return sendMessage('pri(accounts.show)', {
    address,
    isShowing
  });
}

async function tieAccount(address, genesisHash) {
  return sendMessage('pri(accounts.tie)', {
    address,
    genesisHash
  });
}

async function exportAccount(address, password) {
  return sendMessage('pri(accounts.export)', {
    address,
    password
  });
}

async function exportAccounts(addresses, password) {
  return sendMessage('pri(accounts.batchExport)', {
    addresses,
    password
  });
}

async function validateAccount(address, password) {
  return sendMessage('pri(accounts.validate)', {
    address,
    password
  });
}

async function forgetAccount(address) {
  return sendMessage('pri(accounts.forget)', {
    address
  });
}

async function approveAuthRequest(id) {
  return sendMessage('pri(authorize.approve)', {
    id
  });
}

async function approveMetaRequest(id) {
  return sendMessage('pri(metadata.approve)', {
    id
  });
}

async function cancelSignRequest(id) {
  return sendMessage('pri(signing.cancel)', {
    id
  });
}

async function isSignLocked(id) {
  return sendMessage('pri(signing.isLocked)', {
    id
  });
}

async function approveSignPassword(id, savePass, password) {
  return sendMessage('pri(signing.approve.password)', {
    id,
    password,
    savePass
  });
}

async function approveSignSignature(id, signature) {
  return sendMessage('pri(signing.approve.signature)', {
    id,
    signature
  });
}

async function createAccountExternal(name, address, genesisHash) {
  return sendMessage('pri(accounts.create.external)', {
    address,
    genesisHash,
    name
  });
}

async function createAccountHardware(address, hardwareType, accountIndex, addressOffset, name, genesisHash) {
  return sendMessage('pri(accounts.create.hardware)', {
    accountIndex,
    address,
    addressOffset,
    genesisHash,
    hardwareType,
    name
  });
}

async function createAccountSuri(name, password, suri, type, genesisHash) {
  return sendMessage('pri(accounts.create.suri)', {
    genesisHash,
    name,
    password,
    suri,
    type
  });
}

async function createSeed(length, type) {
  return sendMessage('pri(seed.create)', {
    length,
    type
  });
}

async function getAllMetatdata() {
  return sendMessage('pri(metadata.list)');
}

async function getMetadata(genesisHash, isPartial = false) {
  if (!genesisHash) {
    return null;
  }

  let request = (0, _MetadataCache.getSavedMeta)(genesisHash);

  if (!request) {
    request = sendMessage('pri(metadata.get)', genesisHash || null);
    (0, _MetadataCache.setSavedMeta)(genesisHash, request);
  }

  const def = await request;

  if (def) {
    return (0, _extensionChains.metadataExpand)(def, isPartial);
  } else if (isPartial) {
    const chain = _chains.default.find(chain => chain.genesisHash === genesisHash);

    if (chain) {
      return (0, _extensionChains.metadataExpand)(_objectSpread(_objectSpread({}, chain), {}, {
        specVersion: 0,
        tokenDecimals: 15,
        tokenSymbol: 'Unit',
        types: {}
      }), isPartial);
    }
  }

  return null;
}

async function rejectAuthRequest(id) {
  return sendMessage('pri(authorize.reject)', {
    id
  });
}

async function rejectMetaRequest(id) {
  return sendMessage('pri(metadata.reject)', {
    id
  });
}

async function subscribeAccounts(cb) {
  return sendMessage('pri(accounts.subscribe)', null, cb);
}

async function subscribeAuthorizeRequests(cb) {
  return sendMessage('pri(authorize.requests)', null, cb);
}

async function getAuthList() {
  return sendMessage('pri(authorize.list)');
}

async function toggleAuthorization(url) {
  return sendMessage('pri(authorize.toggle)', url);
}

async function subscribeMetadataRequests(cb) {
  return sendMessage('pri(metadata.requests)', null, cb);
}

async function subscribeSigningRequests(cb) {
  return sendMessage('pri(signing.requests)', null, cb);
}

async function validateSeed(suri, type) {
  return sendMessage('pri(seed.validate)', {
    suri,
    type
  });
}

async function validateDerivationPath(parentAddress, suri, parentPassword) {
  return sendMessage('pri(derivation.validate)', {
    parentAddress,
    parentPassword,
    suri
  });
}

async function deriveAccount(parentAddress, suri, parentPassword, name, password, genesisHash) {
  return sendMessage('pri(derivation.create)', {
    genesisHash,
    name,
    parentAddress,
    parentPassword,
    password,
    suri
  });
}

async function windowOpen(path) {
  return sendMessage('pri(window.open)', path);
}

async function jsonGetAccountInfo(json) {
  return sendMessage('pri(json.account.info)', json);
}

async function jsonRestore(file, password) {
  return sendMessage('pri(json.restore)', {
    file,
    password
  });
}

async function batchRestore(file, password) {
  return sendMessage('pri(json.batchRestore)', {
    file,
    password
  });
}

async function setNotification(notification) {
  return sendMessage('pri(settings.notification)', notification);
}