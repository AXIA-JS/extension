import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { ALLOWED_PATH, PASSWORD_EXPIRY_MS } from '@axia-js/extension-base/defaults';
import chrome from '@axia-js/extension-inject/chrome';
import { TypeRegistry } from '@axia-js/types';
import keyring from '@axia-js/ui-keyring';
import { accounts as accountsObservable } from '@axia-js/ui-keyring/observable/accounts';
import { assert, isHex } from '@axia-js/util';
import { keyExtractSuri, mnemonicGenerate, mnemonicValidate } from '@axia-js/util-crypto';
import { createSubscription, unsubscribe } from "./subscriptions.js";
const SEED_DEFAULT_LENGTH = 12;
const SEED_LENGTHS = [12, 15, 18, 21, 24]; // a global registry to use internally

const registry = new TypeRegistry();

function transformAccounts(accounts) {
  return Object.values(accounts).map(({
    json: {
      address,
      meta
    },
    type
  }) => _objectSpread(_objectSpread({
    address
  }, meta), {}, {
    type
  }));
}

function isJsonPayload(value) {
  return value.genesisHash !== undefined;
}

var _cachedUnlocks = /*#__PURE__*/_classPrivateFieldLooseKey("cachedUnlocks");

var _state = /*#__PURE__*/_classPrivateFieldLooseKey("state");

export default class Extension {
  constructor(state) {
    Object.defineProperty(this, _cachedUnlocks, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _state, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _cachedUnlocks)[_cachedUnlocks] = {};
    _classPrivateFieldLooseBase(this, _state)[_state] = state;
  }

  accountsCreateExternal({
    address,
    genesisHash,
    name
  }) {
    keyring.addExternal(address, {
      genesisHash,
      name
    });
    return true;
  }

  accountsCreateHardware({
    accountIndex,
    address,
    addressOffset,
    genesisHash,
    hardwareType,
    name
  }) {
    keyring.addHardware(address, hardwareType, {
      accountIndex,
      addressOffset,
      genesisHash,
      name
    });
    return true;
  }

  accountsCreateSuri({
    genesisHash,
    name,
    password,
    suri,
    type
  }) {
    keyring.addUri(suri, password, {
      genesisHash,
      name
    }, type);
    return true;
  }

  accountsChangePassword({
    address,
    newPass,
    oldPass
  }) {
    const pair = keyring.getPair(address);
    assert(pair, 'Unable to find pair');

    try {
      if (!pair.isLocked) {
        pair.lock();
      }

      pair.decodePkcs8(oldPass);
    } catch (error) {
      throw new Error('oldPass is invalid');
    }

    keyring.encryptAccount(pair, newPass);
    return true;
  }

  accountsEdit({
    address,
    name
  }) {
    const pair = keyring.getPair(address);
    assert(pair, 'Unable to find pair');
    keyring.saveAccountMeta(pair, _objectSpread(_objectSpread({}, pair.meta), {}, {
      name
    }));
    return true;
  }

  accountsExport({
    address,
    password
  }) {
    return {
      exportedJson: keyring.backupAccount(keyring.getPair(address), password)
    };
  }

  async accountsBatchExport({
    addresses,
    password
  }) {
    return {
      exportedJson: await keyring.backupAccounts(addresses, password)
    };
  }

  accountsForget({
    address
  }) {
    keyring.forgetAccount(address);
    return true;
  }

  refreshAccountPasswordCache(pair) {
    const {
      address
    } = pair;
    const savedExpiry = _classPrivateFieldLooseBase(this, _cachedUnlocks)[_cachedUnlocks][address] || 0;
    const remainingTime = savedExpiry - Date.now();

    if (remainingTime < 0) {
      _classPrivateFieldLooseBase(this, _cachedUnlocks)[_cachedUnlocks][address] = 0;
      pair.lock();
      return 0;
    }

    return remainingTime;
  }

  accountsShow({
    address,
    isShowing
  }) {
    const pair = keyring.getPair(address);
    assert(pair, 'Unable to find pair');
    keyring.saveAccountMeta(pair, _objectSpread(_objectSpread({}, pair.meta), {}, {
      isHidden: !isShowing
    }));
    return true;
  }

  accountsTie({
    address,
    genesisHash
  }) {
    const pair = keyring.getPair(address);
    assert(pair, 'Unable to find pair');
    keyring.saveAccountMeta(pair, _objectSpread(_objectSpread({}, pair.meta), {}, {
      genesisHash
    }));
    return true;
  }

  accountsValidate({
    address,
    password
  }) {
    try {
      keyring.backupAccount(keyring.getPair(address), password);
      return true;
    } catch (e) {
      return false;
    }
  } // FIXME This looks very much like what we have in Tabs


  accountsSubscribe(id, port) {
    const cb = createSubscription(id, port);
    const subscription = accountsObservable.subject.subscribe(accounts => cb(transformAccounts(accounts)));
    port.onDisconnect.addListener(() => {
      unsubscribe(id);
      subscription.unsubscribe();
    });
    return true;
  }

  authorizeApprove({
    id
  }) {
    const queued = _classPrivateFieldLooseBase(this, _state)[_state].getAuthRequest(id);

    assert(queued, 'Unable to find request');
    const {
      resolve
    } = queued;
    resolve(true);
    return true;
  }

  getAuthList() {
    return {
      list: _classPrivateFieldLooseBase(this, _state)[_state].authUrls
    };
  }

  authorizeReject({
    id
  }) {
    const queued = _classPrivateFieldLooseBase(this, _state)[_state].getAuthRequest(id);

    assert(queued, 'Unable to find request');
    const {
      reject
    } = queued;
    reject(new Error('Rejected'));
    return true;
  } // FIXME This looks very much like what we have in accounts


  authorizeSubscribe(id, port) {
    const cb = createSubscription(id, port);

    const subscription = _classPrivateFieldLooseBase(this, _state)[_state].authSubject.subscribe(requests => cb(requests));

    port.onDisconnect.addListener(() => {
      unsubscribe(id);
      subscription.unsubscribe();
    });
    return true;
  }

  metadataApprove({
    id
  }) {
    const queued = _classPrivateFieldLooseBase(this, _state)[_state].getMetaRequest(id);

    assert(queued, 'Unable to find request');
    const {
      request,
      resolve
    } = queued;

    _classPrivateFieldLooseBase(this, _state)[_state].saveMetadata(request);

    resolve(true);
    return true;
  }

  metadataGet(genesisHash) {
    return _classPrivateFieldLooseBase(this, _state)[_state].knownMetadata.find(result => result.genesisHash === genesisHash) || null;
  }

  metadataList() {
    return _classPrivateFieldLooseBase(this, _state)[_state].knownMetadata;
  }

  metadataReject({
    id
  }) {
    const queued = _classPrivateFieldLooseBase(this, _state)[_state].getMetaRequest(id);

    assert(queued, 'Unable to find request');
    const {
      reject
    } = queued;
    reject(new Error('Rejected'));
    return true;
  }

  metadataSubscribe(id, port) {
    const cb = createSubscription(id, port);

    const subscription = _classPrivateFieldLooseBase(this, _state)[_state].metaSubject.subscribe(requests => cb(requests));

    port.onDisconnect.addListener(() => {
      unsubscribe(id);
      subscription.unsubscribe();
    });
    return true;
  }

  jsonRestore({
    file,
    password
  }) {
    try {
      keyring.restoreAccount(file, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  batchRestore({
    file,
    password
  }) {
    try {
      keyring.restoreAccounts(file, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  jsonGetAccountInfo(json) {
    try {
      const {
        address,
        meta: {
          genesisHash,
          name
        },
        type
      } = keyring.createFromJson(json);
      return {
        address,
        genesisHash,
        name,
        type
      };
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    }
  }

  seedCreate({
    length = SEED_DEFAULT_LENGTH,
    type
  }) {
    const seed = mnemonicGenerate(length);
    return {
      address: keyring.createFromUri(seed, {}, type).address,
      seed
    };
  }

  seedValidate({
    suri,
    type
  }) {
    const {
      phrase
    } = keyExtractSuri(suri);

    if (isHex(phrase)) {
      assert(isHex(phrase, 256), 'Hex seed needs to be 256-bits');
    } else {
      // sadly isHex detects as string, so we need a cast here
      assert(SEED_LENGTHS.includes(phrase.split(' ').length), `Mnemonic needs to contain ${SEED_LENGTHS.join(', ')} words`);
      assert(mnemonicValidate(phrase), 'Not a valid mnemonic seed');
    }

    return {
      address: keyring.createFromUri(suri, {}, type).address,
      suri
    };
  }

  signingApprovePassword({
    id,
    password,
    savePass
  }) {
    const queued = _classPrivateFieldLooseBase(this, _state)[_state].getSignRequest(id);

    assert(queued, 'Unable to find request');
    const {
      reject,
      request,
      resolve
    } = queued;
    const pair = keyring.getPair(queued.account.address); // unlike queued.account.address the following
    // address is encoded with the default prefix
    // which what is used for password caching mapping

    const {
      address
    } = pair;

    if (!pair) {
      reject(new Error('Unable to find pair'));
      return false;
    }

    this.refreshAccountPasswordCache(pair); // if the keyring pair is locked, the password is needed

    if (pair.isLocked && !password) {
      reject(new Error('Password needed to unlock the account'));
    }

    if (pair.isLocked) {
      pair.decodePkcs8(password);
    }

    const {
      payload
    } = request;

    if (isJsonPayload(payload)) {
      // Get the metadata for the genesisHash
      const currentMetadata = _classPrivateFieldLooseBase(this, _state)[_state].knownMetadata.find(meta => meta.genesisHash === payload.genesisHash); // set the registry before calling the sign function


      registry.setSignedExtensions(payload.signedExtensions, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.userExtensions);

      if (currentMetadata) {
        registry.register(currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.types);
      }
    }

    const result = request.sign(registry, pair);

    if (savePass) {
      _classPrivateFieldLooseBase(this, _cachedUnlocks)[_cachedUnlocks][address] = Date.now() + PASSWORD_EXPIRY_MS;
    } else {
      pair.lock();
    }

    resolve(_objectSpread({
      id
    }, result));
    return true;
  }

  signingApproveSignature({
    id,
    signature
  }) {
    const queued = _classPrivateFieldLooseBase(this, _state)[_state].getSignRequest(id);

    assert(queued, 'Unable to find request');
    const {
      resolve
    } = queued;
    resolve({
      id,
      signature
    });
    return true;
  }

  signingCancel({
    id
  }) {
    const queued = _classPrivateFieldLooseBase(this, _state)[_state].getSignRequest(id);

    assert(queued, 'Unable to find request');
    const {
      reject
    } = queued;
    reject(new Error('Cancelled'));
    return true;
  }

  signingIsLocked({
    id
  }) {
    const queued = _classPrivateFieldLooseBase(this, _state)[_state].getSignRequest(id);

    assert(queued, 'Unable to find request');
    const address = queued.request.payload.address;
    const pair = keyring.getPair(address);
    assert(pair, 'Unable to find pair');
    const remainingTime = this.refreshAccountPasswordCache(pair);
    return {
      isLocked: pair.isLocked,
      remainingTime
    };
  } // FIXME This looks very much like what we have in authorization


  signingSubscribe(id, port) {
    const cb = createSubscription(id, port);

    const subscription = _classPrivateFieldLooseBase(this, _state)[_state].signSubject.subscribe(requests => cb(requests));

    port.onDisconnect.addListener(() => {
      unsubscribe(id);
      subscription.unsubscribe();
    });
    return true;
  }

  windowOpen(path) {
    const url = `${chrome.extension.getURL('index.html')}#${path}`;

    if (!ALLOWED_PATH.includes(path)) {
      console.error('Not allowed to open the url:', url);
      return false;
    }

    console.log('open', url); // eslint-disable-next-line no-void

    void chrome.tabs.create({
      url
    });
    return true;
  }

  derive(parentAddress, suri, password, metadata) {
    const parentPair = keyring.getPair(parentAddress);

    try {
      parentPair.decodePkcs8(password);
    } catch (e) {
      throw new Error('invalid password');
    }

    try {
      return parentPair.derive(suri, metadata);
    } catch (err) {
      throw new Error(`"${suri}" is not a valid derivation path`);
    }
  }

  derivationValidate({
    parentAddress,
    parentPassword,
    suri
  }) {
    const childPair = this.derive(parentAddress, suri, parentPassword, {});
    return {
      address: childPair.address,
      suri
    };
  }

  derivationCreate({
    genesisHash,
    name,
    parentAddress,
    parentPassword,
    password,
    suri
  }) {
    const childPair = this.derive(parentAddress, suri, parentPassword, {
      genesisHash,
      name,
      parentAddress,
      suri
    });
    keyring.addPair(childPair, password);
    return true;
  }

  toggleAuthorization(url) {
    return {
      list: _classPrivateFieldLooseBase(this, _state)[_state].toggleAuthorization(url)
    };
  } // Weird thought, the eslint override is not needed in Tabs
  // eslint-disable-next-line @typescript-eslint/require-await


  async handle(id, type, request, port) {
    switch (type) {
      case 'pri(authorize.approve)':
        return this.authorizeApprove(request);

      case 'pri(authorize.list)':
        return this.getAuthList();

      case 'pri(authorize.reject)':
        return this.authorizeReject(request);

      case 'pri(authorize.toggle)':
        return this.toggleAuthorization(request);

      case 'pri(authorize.requests)':
        return this.authorizeSubscribe(id, port);

      case 'pri(accounts.create.external)':
        return this.accountsCreateExternal(request);

      case 'pri(accounts.create.hardware)':
        return this.accountsCreateHardware(request);

      case 'pri(accounts.create.suri)':
        return this.accountsCreateSuri(request);

      case 'pri(accounts.changePassword)':
        return this.accountsChangePassword(request);

      case 'pri(accounts.edit)':
        return this.accountsEdit(request);

      case 'pri(accounts.export)':
        return this.accountsExport(request);

      case 'pri(accounts.batchExport)':
        return this.accountsBatchExport(request);

      case 'pri(accounts.forget)':
        return this.accountsForget(request);

      case 'pri(accounts.show)':
        return this.accountsShow(request);

      case 'pri(accounts.subscribe)':
        return this.accountsSubscribe(id, port);

      case 'pri(accounts.tie)':
        return this.accountsTie(request);

      case 'pri(accounts.validate)':
        return this.accountsValidate(request);

      case 'pri(metadata.approve)':
        return this.metadataApprove(request);

      case 'pri(metadata.get)':
        return this.metadataGet(request);

      case 'pri(metadata.list)':
        return this.metadataList();

      case 'pri(metadata.reject)':
        return this.metadataReject(request);

      case 'pri(metadata.requests)':
        return this.metadataSubscribe(id, port);

      case 'pri(derivation.create)':
        return this.derivationCreate(request);

      case 'pri(derivation.validate)':
        return this.derivationValidate(request);

      case 'pri(json.restore)':
        return this.jsonRestore(request);

      case 'pri(json.batchRestore)':
        return this.batchRestore(request);

      case 'pri(json.account.info)':
        return this.jsonGetAccountInfo(request);

      case 'pri(seed.create)':
        return this.seedCreate(request);

      case 'pri(seed.validate)':
        return this.seedValidate(request);

      case 'pri(settings.notification)':
        return _classPrivateFieldLooseBase(this, _state)[_state].setNotification(request);

      case 'pri(signing.approve.password)':
        return this.signingApprovePassword(request);

      case 'pri(signing.approve.signature)':
        return this.signingApproveSignature(request);

      case 'pri(signing.cancel)':
        return this.signingCancel(request);

      case 'pri(signing.isLocked)':
        return this.signingIsLocked(request);

      case 'pri(signing.requests)':
        return this.signingSubscribe(id, port);

      case 'pri(window.open)':
        return this.windowOpen(request);

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }

}