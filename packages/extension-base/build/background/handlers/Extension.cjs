"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _defaults = require("@axia-js/extension-base/defaults");

var _chrome = _interopRequireDefault(require("@axia-js/extension-inject/chrome"));

var _types = require("@axia-js/types");

var _uiKeyring = _interopRequireDefault(require("@axia-js/ui-keyring"));

var _accounts = require("@axia-js/ui-keyring/observable/accounts");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _subscriptions = require("./subscriptions.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const SEED_DEFAULT_LENGTH = 12;
const SEED_LENGTHS = [12, 15, 18, 21, 24]; // a global registry to use internally

const registry = new _types.TypeRegistry();

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

var _cachedUnlocks = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("cachedUnlocks");

var _state = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("state");

class Extension {
  constructor(state) {
    Object.defineProperty(this, _cachedUnlocks, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _state, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldLooseBase2.default)(this, _cachedUnlocks)[_cachedUnlocks] = {};
    (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state] = state;
  }

  accountsCreateExternal({
    address,
    genesisHash,
    name
  }) {
    _uiKeyring.default.addExternal(address, {
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
    _uiKeyring.default.addHardware(address, hardwareType, {
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
    _uiKeyring.default.addUri(suri, password, {
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
    const pair = _uiKeyring.default.getPair(address);

    (0, _util.assert)(pair, 'Unable to find pair');

    try {
      if (!pair.isLocked) {
        pair.lock();
      }

      pair.decodePkcs8(oldPass);
    } catch (error) {
      throw new Error('oldPass is invalid');
    }

    _uiKeyring.default.encryptAccount(pair, newPass);

    return true;
  }

  accountsEdit({
    address,
    name
  }) {
    const pair = _uiKeyring.default.getPair(address);

    (0, _util.assert)(pair, 'Unable to find pair');

    _uiKeyring.default.saveAccountMeta(pair, _objectSpread(_objectSpread({}, pair.meta), {}, {
      name
    }));

    return true;
  }

  accountsExport({
    address,
    password
  }) {
    return {
      exportedJson: _uiKeyring.default.backupAccount(_uiKeyring.default.getPair(address), password)
    };
  }

  async accountsBatchExport({
    addresses,
    password
  }) {
    return {
      exportedJson: await _uiKeyring.default.backupAccounts(addresses, password)
    };
  }

  accountsForget({
    address
  }) {
    _uiKeyring.default.forgetAccount(address);

    return true;
  }

  refreshAccountPasswordCache(pair) {
    const {
      address
    } = pair;
    const savedExpiry = (0, _classPrivateFieldLooseBase2.default)(this, _cachedUnlocks)[_cachedUnlocks][address] || 0;
    const remainingTime = savedExpiry - Date.now();

    if (remainingTime < 0) {
      (0, _classPrivateFieldLooseBase2.default)(this, _cachedUnlocks)[_cachedUnlocks][address] = 0;
      pair.lock();
      return 0;
    }

    return remainingTime;
  }

  accountsShow({
    address,
    isShowing
  }) {
    const pair = _uiKeyring.default.getPair(address);

    (0, _util.assert)(pair, 'Unable to find pair');

    _uiKeyring.default.saveAccountMeta(pair, _objectSpread(_objectSpread({}, pair.meta), {}, {
      isHidden: !isShowing
    }));

    return true;
  }

  accountsTie({
    address,
    genesisHash
  }) {
    const pair = _uiKeyring.default.getPair(address);

    (0, _util.assert)(pair, 'Unable to find pair');

    _uiKeyring.default.saveAccountMeta(pair, _objectSpread(_objectSpread({}, pair.meta), {}, {
      genesisHash
    }));

    return true;
  }

  accountsValidate({
    address,
    password
  }) {
    try {
      _uiKeyring.default.backupAccount(_uiKeyring.default.getPair(address), password);

      return true;
    } catch (e) {
      return false;
    }
  } // FIXME This looks very much like what we have in Tabs


  accountsSubscribe(id, port) {
    const cb = (0, _subscriptions.createSubscription)(id, port);

    const subscription = _accounts.accounts.subject.subscribe(accounts => cb(transformAccounts(accounts)));

    port.onDisconnect.addListener(() => {
      (0, _subscriptions.unsubscribe)(id);
      subscription.unsubscribe();
    });
    return true;
  }

  authorizeApprove({
    id
  }) {
    const queued = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].getAuthRequest(id);

    (0, _util.assert)(queued, 'Unable to find request');
    const {
      resolve
    } = queued;
    resolve(true);
    return true;
  }

  getAuthList() {
    return {
      list: (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].authUrls
    };
  }

  authorizeReject({
    id
  }) {
    const queued = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].getAuthRequest(id);

    (0, _util.assert)(queued, 'Unable to find request');
    const {
      reject
    } = queued;
    reject(new Error('Rejected'));
    return true;
  } // FIXME This looks very much like what we have in accounts


  authorizeSubscribe(id, port) {
    const cb = (0, _subscriptions.createSubscription)(id, port);

    const subscription = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].authSubject.subscribe(requests => cb(requests));

    port.onDisconnect.addListener(() => {
      (0, _subscriptions.unsubscribe)(id);
      subscription.unsubscribe();
    });
    return true;
  }

  metadataApprove({
    id
  }) {
    const queued = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].getMetaRequest(id);

    (0, _util.assert)(queued, 'Unable to find request');
    const {
      request,
      resolve
    } = queued;

    (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].saveMetadata(request);

    resolve(true);
    return true;
  }

  metadataGet(genesisHash) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].knownMetadata.find(result => result.genesisHash === genesisHash) || null;
  }

  metadataList() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].knownMetadata;
  }

  metadataReject({
    id
  }) {
    const queued = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].getMetaRequest(id);

    (0, _util.assert)(queued, 'Unable to find request');
    const {
      reject
    } = queued;
    reject(new Error('Rejected'));
    return true;
  }

  metadataSubscribe(id, port) {
    const cb = (0, _subscriptions.createSubscription)(id, port);

    const subscription = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].metaSubject.subscribe(requests => cb(requests));

    port.onDisconnect.addListener(() => {
      (0, _subscriptions.unsubscribe)(id);
      subscription.unsubscribe();
    });
    return true;
  }

  jsonRestore({
    file,
    password
  }) {
    try {
      _uiKeyring.default.restoreAccount(file, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  batchRestore({
    file,
    password
  }) {
    try {
      _uiKeyring.default.restoreAccounts(file, password);
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
      } = _uiKeyring.default.createFromJson(json);

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
    const seed = (0, _utilCrypto.mnemonicGenerate)(length);
    return {
      address: _uiKeyring.default.createFromUri(seed, {}, type).address,
      seed
    };
  }

  seedValidate({
    suri,
    type
  }) {
    const {
      phrase
    } = (0, _utilCrypto.keyExtractSuri)(suri);

    if ((0, _util.isHex)(phrase)) {
      (0, _util.assert)((0, _util.isHex)(phrase, 256), 'Hex seed needs to be 256-bits');
    } else {
      // sadly isHex detects as string, so we need a cast here
      (0, _util.assert)(SEED_LENGTHS.includes(phrase.split(' ').length), `Mnemonic needs to contain ${SEED_LENGTHS.join(', ')} words`);
      (0, _util.assert)((0, _utilCrypto.mnemonicValidate)(phrase), 'Not a valid mnemonic seed');
    }

    return {
      address: _uiKeyring.default.createFromUri(suri, {}, type).address,
      suri
    };
  }

  signingApprovePassword({
    id,
    password,
    savePass
  }) {
    const queued = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].getSignRequest(id);

    (0, _util.assert)(queued, 'Unable to find request');
    const {
      reject,
      request,
      resolve
    } = queued;

    const pair = _uiKeyring.default.getPair(queued.account.address); // unlike queued.account.address the following
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
      const currentMetadata = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].knownMetadata.find(meta => meta.genesisHash === payload.genesisHash); // set the registry before calling the sign function


      registry.setSignedExtensions(payload.signedExtensions, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.userExtensions);

      if (currentMetadata) {
        registry.register(currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.types);
      }
    }

    const result = request.sign(registry, pair);

    if (savePass) {
      (0, _classPrivateFieldLooseBase2.default)(this, _cachedUnlocks)[_cachedUnlocks][address] = Date.now() + _defaults.PASSWORD_EXPIRY_MS;
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
    const queued = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].getSignRequest(id);

    (0, _util.assert)(queued, 'Unable to find request');
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
    const queued = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].getSignRequest(id);

    (0, _util.assert)(queued, 'Unable to find request');
    const {
      reject
    } = queued;
    reject(new Error('Cancelled'));
    return true;
  }

  signingIsLocked({
    id
  }) {
    const queued = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].getSignRequest(id);

    (0, _util.assert)(queued, 'Unable to find request');
    const address = queued.request.payload.address;

    const pair = _uiKeyring.default.getPair(address);

    (0, _util.assert)(pair, 'Unable to find pair');
    const remainingTime = this.refreshAccountPasswordCache(pair);
    return {
      isLocked: pair.isLocked,
      remainingTime
    };
  } // FIXME This looks very much like what we have in authorization


  signingSubscribe(id, port) {
    const cb = (0, _subscriptions.createSubscription)(id, port);

    const subscription = (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].signSubject.subscribe(requests => cb(requests));

    port.onDisconnect.addListener(() => {
      (0, _subscriptions.unsubscribe)(id);
      subscription.unsubscribe();
    });
    return true;
  }

  windowOpen(path) {
    const url = `${_chrome.default.extension.getURL('index.html')}#${path}`;

    if (!_defaults.ALLOWED_PATH.includes(path)) {
      console.error('Not allowed to open the url:', url);
      return false;
    }

    console.log('open', url); // eslint-disable-next-line no-void

    void _chrome.default.tabs.create({
      url
    });
    return true;
  }

  derive(parentAddress, suri, password, metadata) {
    const parentPair = _uiKeyring.default.getPair(parentAddress);

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

    _uiKeyring.default.addPair(childPair, password);

    return true;
  }

  toggleAuthorization(url) {
    return {
      list: (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].toggleAuthorization(url)
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
        return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].setNotification(request);

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

exports.default = Extension;