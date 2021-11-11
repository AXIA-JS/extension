"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NotificationOptions = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _rxjs = require("rxjs");

var _extensionChains = require("@axia-js/extension-chains");

var _chrome = _interopRequireDefault(require("@axia-js/extension-inject/chrome"));

var _uiSettings = _interopRequireDefault(require("@axia-js/ui-settings"));

var _util = require("@axia-js/util");

var _index = require("../../stores/index.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

let idCounter = 0;

const NOTIFICATION_URL = _chrome.default.extension.getURL('notification.html');

const POPUP_WINDOW_OPTS = {
  focused: true,
  height: 621,
  left: 150,
  top: 150,
  type: 'popup',
  url: NOTIFICATION_URL,
  width: 560
};
const NORMAL_WINDOW_OPTS = {
  focused: true,
  type: 'normal',
  url: NOTIFICATION_URL
};
let NotificationOptions;
exports.NotificationOptions = NotificationOptions;

(function (NotificationOptions) {
  NotificationOptions[NotificationOptions["None"] = 0] = "None";
  NotificationOptions[NotificationOptions["Normal"] = 1] = "Normal";
  NotificationOptions[NotificationOptions["PopUp"] = 2] = "PopUp";
})(NotificationOptions || (exports.NotificationOptions = NotificationOptions = {}));

const AUTH_URLS_KEY = 'authUrls';

function getId() {
  return `${Date.now()}.${++idCounter}`;
}

var _authUrls = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("authUrls");

var _authRequests = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("authRequests");

var _metaStore = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("metaStore");

var _injectedProviders = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("injectedProviders");

var _metaRequests = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("metaRequests");

var _notification = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("notification");

var _providers = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("providers");

var _signRequests = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("signRequests");

var _windows = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("windows");

class State {
  // Map of providers currently injected in tabs
  // Map of all providers exposed by the extension, they are retrievable by key
  constructor(providers = {}) {
    Object.defineProperty(this, _authUrls, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _authRequests, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _metaStore, {
      writable: true,
      value: new _index.MetadataStore()
    });
    Object.defineProperty(this, _injectedProviders, {
      writable: true,
      value: new Map()
    });
    Object.defineProperty(this, _metaRequests, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _notification, {
      writable: true,
      value: _uiSettings.default.notification
    });
    Object.defineProperty(this, _providers, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _signRequests, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _windows, {
      writable: true,
      value: []
    });
    this.authSubject = new _rxjs.BehaviorSubject([]);
    this.metaSubject = new _rxjs.BehaviorSubject([]);
    this.signSubject = new _rxjs.BehaviorSubject([]);

    this.authComplete = (id, resolve, reject) => {
      const complete = result => {
        const isAllowed = result === true;

        const {
          idStr,
          request: {
            origin
          },
          url
        } = (0, _classPrivateFieldLooseBase2.default)(this, _authRequests)[_authRequests][id];

        (0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls][this.stripUrl(url)] = {
          count: 0,
          id: idStr,
          isAllowed,
          origin,
          url
        };
        this.saveCurrentAuthList();
        delete (0, _classPrivateFieldLooseBase2.default)(this, _authRequests)[_authRequests][id];
        this.updateIconAuth(true);
      };

      return {
        reject: error => {
          complete(error);
          reject(error);
        },
        resolve: result => {
          complete(result);
          resolve(result);
        }
      };
    };

    this.metaComplete = (id, resolve, reject) => {
      const complete = () => {
        delete (0, _classPrivateFieldLooseBase2.default)(this, _metaRequests)[_metaRequests][id];
        this.updateIconMeta(true);
      };

      return {
        reject: error => {
          complete();
          reject(error);
        },
        resolve: result => {
          complete();
          resolve(result);
        }
      };
    };

    this.signComplete = (id, resolve, reject) => {
      const complete = () => {
        delete (0, _classPrivateFieldLooseBase2.default)(this, _signRequests)[_signRequests][id];
        this.updateIconSign(true);
      };

      return {
        reject: error => {
          complete();
          reject(error);
        },
        resolve: result => {
          complete();
          resolve(result);
        }
      };
    };

    (0, _classPrivateFieldLooseBase2.default)(this, _providers)[_providers] = providers;

    (0, _classPrivateFieldLooseBase2.default)(this, _metaStore)[_metaStore].all((_key, def) => {
      (0, _extensionChains.addMetadata)(def);
    }); // retrieve previously set authorizations


    const authString = localStorage.getItem(AUTH_URLS_KEY) || '{}';
    const previousAuth = JSON.parse(authString);
    (0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls] = previousAuth;
  }

  get knownMetadata() {
    return (0, _extensionChains.knownMetadata)();
  }

  get numAuthRequests() {
    return Object.keys((0, _classPrivateFieldLooseBase2.default)(this, _authRequests)[_authRequests]).length;
  }

  get numMetaRequests() {
    return Object.keys((0, _classPrivateFieldLooseBase2.default)(this, _metaRequests)[_metaRequests]).length;
  }

  get numSignRequests() {
    return Object.keys((0, _classPrivateFieldLooseBase2.default)(this, _signRequests)[_signRequests]).length;
  }

  get allAuthRequests() {
    return Object.values((0, _classPrivateFieldLooseBase2.default)(this, _authRequests)[_authRequests]).map(({
      id,
      request,
      url
    }) => ({
      id,
      request,
      url
    }));
  }

  get allMetaRequests() {
    return Object.values((0, _classPrivateFieldLooseBase2.default)(this, _metaRequests)[_metaRequests]).map(({
      id,
      request,
      url
    }) => ({
      id,
      request,
      url
    }));
  }

  get allSignRequests() {
    return Object.values((0, _classPrivateFieldLooseBase2.default)(this, _signRequests)[_signRequests]).map(({
      account,
      id,
      request,
      url
    }) => ({
      account,
      id,
      request,
      url
    }));
  }

  get authUrls() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls];
  }

  popupClose() {
    (0, _classPrivateFieldLooseBase2.default)(this, _windows)[_windows].forEach(id => // eslint-disable-next-line no-void
    void _chrome.default.windows.remove(id));

    (0, _classPrivateFieldLooseBase2.default)(this, _windows)[_windows] = [];
  }

  popupOpen() {
    (0, _classPrivateFieldLooseBase2.default)(this, _notification)[_notification] !== 'extension' && _chrome.default.windows.create((0, _classPrivateFieldLooseBase2.default)(this, _notification)[_notification] === 'window' ? NORMAL_WINDOW_OPTS : POPUP_WINDOW_OPTS, window => {
      if (window) {
        (0, _classPrivateFieldLooseBase2.default)(this, _windows)[_windows].push(window.id || 0);
      }
    });
  }

  saveCurrentAuthList() {
    localStorage.setItem(AUTH_URLS_KEY, JSON.stringify((0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls]));
  }

  stripUrl(url) {
    (0, _util.assert)(url && (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('ipfs:') || url.startsWith('ipns:')), `Invalid url ${url}, expected to start with http: or https: or ipfs: or ipns:`);
    const parts = url.split('/');
    return parts[2];
  }

  updateIcon(shouldClose) {
    const authCount = this.numAuthRequests;
    const metaCount = this.numMetaRequests;
    const signCount = this.numSignRequests;
    const text = authCount ? 'Auth' : metaCount ? 'Meta' : signCount ? `${signCount}` : ''; // eslint-disable-next-line no-void

    void _chrome.default.browserAction.setBadgeText({
      text
    });

    if (shouldClose && text === '') {
      this.popupClose();
    }
  }

  toggleAuthorization(url) {
    const entry = (0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls][url];

    (0, _util.assert)(entry, `The source ${url} is not known`);
    const newAllowState = !entry.isAllowed;
    (0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls][url].isAllowed = newAllowState;
    return (0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls];
  }

  updateIconAuth(shouldClose) {
    this.authSubject.next(this.allAuthRequests);
    this.updateIcon(shouldClose);
  }

  updateIconMeta(shouldClose) {
    this.metaSubject.next(this.allMetaRequests);
    this.updateIcon(shouldClose);
  }

  updateIconSign(shouldClose) {
    this.signSubject.next(this.allSignRequests);
    this.updateIcon(shouldClose);
  }

  async authorizeUrl(url, request) {
    const idStr = this.stripUrl(url); // Do not enqueue duplicate authorization requests.

    const isDuplicate = Object.values((0, _classPrivateFieldLooseBase2.default)(this, _authRequests)[_authRequests]).some(request => request.idStr === idStr);
    (0, _util.assert)(!isDuplicate, `The source ${url} has a pending authorization request`);

    if ((0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls][idStr]) {
      // this url was seen in the past
      (0, _util.assert)((0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls][idStr].isAllowed, `The source ${url} is not allowed to interact with this extension`);
      return false;
    }

    return new Promise((resolve, reject) => {
      const id = getId();
      (0, _classPrivateFieldLooseBase2.default)(this, _authRequests)[_authRequests][id] = _objectSpread(_objectSpread({}, this.authComplete(id, resolve, reject)), {}, {
        id,
        idStr,
        request,
        url
      });
      this.updateIconAuth();
      this.popupOpen();
    });
  }

  ensureUrlAuthorized(url) {
    const entry = (0, _classPrivateFieldLooseBase2.default)(this, _authUrls)[_authUrls][this.stripUrl(url)];

    (0, _util.assert)(entry, `The source ${url} has not been enabled yet`);
    (0, _util.assert)(entry.isAllowed, `The source ${url} is not allowed to interact with this extension`);
    return true;
  }

  injectMetadata(url, request) {
    return new Promise((resolve, reject) => {
      const id = getId();
      (0, _classPrivateFieldLooseBase2.default)(this, _metaRequests)[_metaRequests][id] = _objectSpread(_objectSpread({}, this.metaComplete(id, resolve, reject)), {}, {
        id,
        request,
        url
      });
      this.updateIconMeta();
      this.popupOpen();
    });
  }

  getAuthRequest(id) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _authRequests)[_authRequests][id];
  }

  getMetaRequest(id) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _metaRequests)[_metaRequests][id];
  }

  getSignRequest(id) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _signRequests)[_signRequests][id];
  } // List all providers the extension is exposing


  rpcListProviders() {
    return Promise.resolve(Object.keys((0, _classPrivateFieldLooseBase2.default)(this, _providers)[_providers]).reduce((acc, key) => {
      acc[key] = (0, _classPrivateFieldLooseBase2.default)(this, _providers)[_providers][key].meta;
      return acc;
    }, {}));
  }

  rpcSend(request, port) {
    const provider = (0, _classPrivateFieldLooseBase2.default)(this, _injectedProviders)[_injectedProviders].get(port);

    (0, _util.assert)(provider, 'Cannot call pub(rpc.subscribe) before provider is set');
    return provider.send(request.method, request.params);
  } // Start a provider, return its meta


  rpcStartProvider(key, port) {
    (0, _util.assert)(Object.keys((0, _classPrivateFieldLooseBase2.default)(this, _providers)[_providers]).includes(key), `Provider ${key} is not exposed by extension`);

    if ((0, _classPrivateFieldLooseBase2.default)(this, _injectedProviders)[_injectedProviders].get(port)) {
      return Promise.resolve((0, _classPrivateFieldLooseBase2.default)(this, _providers)[_providers][key].meta);
    } // Instantiate the provider


    (0, _classPrivateFieldLooseBase2.default)(this, _injectedProviders)[_injectedProviders].set(port, (0, _classPrivateFieldLooseBase2.default)(this, _providers)[_providers][key].start()); // Close provider connection when page is closed


    port.onDisconnect.addListener(() => {
      const provider = (0, _classPrivateFieldLooseBase2.default)(this, _injectedProviders)[_injectedProviders].get(port);

      if (provider) {
        provider.disconnect().catch(console.error);
      }

      (0, _classPrivateFieldLooseBase2.default)(this, _injectedProviders)[_injectedProviders].delete(port);
    });
    return Promise.resolve((0, _classPrivateFieldLooseBase2.default)(this, _providers)[_providers][key].meta);
  }

  rpcSubscribe({
    method,
    params,
    type
  }, cb, port) {
    const provider = (0, _classPrivateFieldLooseBase2.default)(this, _injectedProviders)[_injectedProviders].get(port);

    (0, _util.assert)(provider, 'Cannot call pub(rpc.subscribe) before provider is set');
    return provider.subscribe(type, method, params, cb);
  }

  rpcSubscribeConnected(_request, cb, port) {
    const provider = (0, _classPrivateFieldLooseBase2.default)(this, _injectedProviders)[_injectedProviders].get(port);

    (0, _util.assert)(provider, 'Cannot call pub(rpc.subscribeConnected) before provider is set');
    cb(null, provider.isConnected); // Immediately send back current isConnected

    provider.on('connected', () => cb(null, true));
    provider.on('disconnected', () => cb(null, false));
  }

  rpcUnsubscribe(request, port) {
    const provider = (0, _classPrivateFieldLooseBase2.default)(this, _injectedProviders)[_injectedProviders].get(port);

    (0, _util.assert)(provider, 'Cannot call pub(rpc.unsubscribe) before provider is set');
    return provider.unsubscribe(request.type, request.method, request.subscriptionId);
  }

  saveMetadata(meta) {
    (0, _classPrivateFieldLooseBase2.default)(this, _metaStore)[_metaStore].set(meta.genesisHash, meta);

    (0, _extensionChains.addMetadata)(meta);
  }

  setNotification(notification) {
    (0, _classPrivateFieldLooseBase2.default)(this, _notification)[_notification] = notification;
    return true;
  }

  sign(url, request, account) {
    const id = getId();
    return new Promise((resolve, reject) => {
      (0, _classPrivateFieldLooseBase2.default)(this, _signRequests)[_signRequests][id] = _objectSpread(_objectSpread({}, this.signComplete(id, resolve, reject)), {}, {
        account,
        id,
        request,
        url
      });
      this.updateIconSign();
      this.popupOpen();
    });
  }

}

exports.default = State;