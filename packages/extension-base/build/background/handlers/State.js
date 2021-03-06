import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-bg authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { BehaviorSubject } from 'rxjs';
import { addMetadata, knownMetadata } from '@axia-js/extension-chains';
import chrome from '@axia-js/extension-inject/chrome';
import settings from '@axia-js/ui-settings';
import { assert } from '@axia-js/util';
import { MetadataStore } from "../../stores/index.js";
let idCounter = 0;
const NOTIFICATION_URL = chrome.extension.getURL('notification.html');
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
export let NotificationOptions;

(function (NotificationOptions) {
  NotificationOptions[NotificationOptions["None"] = 0] = "None";
  NotificationOptions[NotificationOptions["Normal"] = 1] = "Normal";
  NotificationOptions[NotificationOptions["PopUp"] = 2] = "PopUp";
})(NotificationOptions || (NotificationOptions = {}));

const AUTH_URLS_KEY = 'authUrls';

function getId() {
  return `${Date.now()}.${++idCounter}`;
}

var _authUrls = /*#__PURE__*/_classPrivateFieldLooseKey("authUrls");

var _authRequests = /*#__PURE__*/_classPrivateFieldLooseKey("authRequests");

var _metaStore = /*#__PURE__*/_classPrivateFieldLooseKey("metaStore");

var _injectedProviders = /*#__PURE__*/_classPrivateFieldLooseKey("injectedProviders");

var _metaRequests = /*#__PURE__*/_classPrivateFieldLooseKey("metaRequests");

var _notification = /*#__PURE__*/_classPrivateFieldLooseKey("notification");

var _providers = /*#__PURE__*/_classPrivateFieldLooseKey("providers");

var _signRequests = /*#__PURE__*/_classPrivateFieldLooseKey("signRequests");

var _windows = /*#__PURE__*/_classPrivateFieldLooseKey("windows");

export default class State {
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
      value: new MetadataStore()
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
      value: settings.notification
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
    this.authSubject = new BehaviorSubject([]);
    this.metaSubject = new BehaviorSubject([]);
    this.signSubject = new BehaviorSubject([]);

    this.authComplete = (id, resolve, reject) => {
      const complete = result => {
        const isAllowed = result === true;

        const {
          idStr,
          request: {
            origin
          },
          url
        } = _classPrivateFieldLooseBase(this, _authRequests)[_authRequests][id];

        _classPrivateFieldLooseBase(this, _authUrls)[_authUrls][this.stripUrl(url)] = {
          count: 0,
          id: idStr,
          isAllowed,
          origin,
          url
        };
        this.saveCurrentAuthList();
        delete _classPrivateFieldLooseBase(this, _authRequests)[_authRequests][id];
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
        delete _classPrivateFieldLooseBase(this, _metaRequests)[_metaRequests][id];
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
        delete _classPrivateFieldLooseBase(this, _signRequests)[_signRequests][id];
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

    _classPrivateFieldLooseBase(this, _providers)[_providers] = providers;

    _classPrivateFieldLooseBase(this, _metaStore)[_metaStore].all((_key, def) => {
      addMetadata(def);
    }); // retrieve previously set authorizations


    const authString = localStorage.getItem(AUTH_URLS_KEY) || '{}';
    const previousAuth = JSON.parse(authString);
    _classPrivateFieldLooseBase(this, _authUrls)[_authUrls] = previousAuth;
  }

  get knownMetadata() {
    return knownMetadata();
  }

  get numAuthRequests() {
    return Object.keys(_classPrivateFieldLooseBase(this, _authRequests)[_authRequests]).length;
  }

  get numMetaRequests() {
    return Object.keys(_classPrivateFieldLooseBase(this, _metaRequests)[_metaRequests]).length;
  }

  get numSignRequests() {
    return Object.keys(_classPrivateFieldLooseBase(this, _signRequests)[_signRequests]).length;
  }

  get allAuthRequests() {
    return Object.values(_classPrivateFieldLooseBase(this, _authRequests)[_authRequests]).map(({
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
    return Object.values(_classPrivateFieldLooseBase(this, _metaRequests)[_metaRequests]).map(({
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
    return Object.values(_classPrivateFieldLooseBase(this, _signRequests)[_signRequests]).map(({
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
    return _classPrivateFieldLooseBase(this, _authUrls)[_authUrls];
  }

  popupClose() {
    _classPrivateFieldLooseBase(this, _windows)[_windows].forEach(id => // eslint-disable-next-line no-void
    void chrome.windows.remove(id));

    _classPrivateFieldLooseBase(this, _windows)[_windows] = [];
  }

  popupOpen() {
    _classPrivateFieldLooseBase(this, _notification)[_notification] !== 'extension' && chrome.windows.create(_classPrivateFieldLooseBase(this, _notification)[_notification] === 'window' ? NORMAL_WINDOW_OPTS : POPUP_WINDOW_OPTS, window => {
      if (window) {
        _classPrivateFieldLooseBase(this, _windows)[_windows].push(window.id || 0);
      }
    });
  }

  saveCurrentAuthList() {
    localStorage.setItem(AUTH_URLS_KEY, JSON.stringify(_classPrivateFieldLooseBase(this, _authUrls)[_authUrls]));
  }

  stripUrl(url) {
    assert(url && (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('ipfs:') || url.startsWith('ipns:')), `Invalid url ${url}, expected to start with http: or https: or ipfs: or ipns:`);
    const parts = url.split('/');
    return parts[2];
  }

  updateIcon(shouldClose) {
    const authCount = this.numAuthRequests;
    const metaCount = this.numMetaRequests;
    const signCount = this.numSignRequests;
    const text = authCount ? 'Auth' : metaCount ? 'Meta' : signCount ? `${signCount}` : ''; // eslint-disable-next-line no-void

    void chrome.browserAction.setBadgeText({
      text
    });

    if (shouldClose && text === '') {
      this.popupClose();
    }
  }

  toggleAuthorization(url) {
    const entry = _classPrivateFieldLooseBase(this, _authUrls)[_authUrls][url];

    assert(entry, `The source ${url} is not known`);
    const newAllowState = !entry.isAllowed;
    _classPrivateFieldLooseBase(this, _authUrls)[_authUrls][url].isAllowed = newAllowState;
    return _classPrivateFieldLooseBase(this, _authUrls)[_authUrls];
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

    const isDuplicate = Object.values(_classPrivateFieldLooseBase(this, _authRequests)[_authRequests]).some(request => request.idStr === idStr);
    assert(!isDuplicate, `The source ${url} has a pending authorization request`);

    if (_classPrivateFieldLooseBase(this, _authUrls)[_authUrls][idStr]) {
      // this url was seen in the past
      assert(_classPrivateFieldLooseBase(this, _authUrls)[_authUrls][idStr].isAllowed, `The source ${url} is not allowed to interact with this extension`);
      return false;
    }

    return new Promise((resolve, reject) => {
      const id = getId();
      _classPrivateFieldLooseBase(this, _authRequests)[_authRequests][id] = _objectSpread(_objectSpread({}, this.authComplete(id, resolve, reject)), {}, {
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
    const entry = _classPrivateFieldLooseBase(this, _authUrls)[_authUrls][this.stripUrl(url)];

    assert(entry, `The source ${url} has not been enabled yet`);
    assert(entry.isAllowed, `The source ${url} is not allowed to interact with this extension`);
    return true;
  }

  injectMetadata(url, request) {
    return new Promise((resolve, reject) => {
      const id = getId();
      _classPrivateFieldLooseBase(this, _metaRequests)[_metaRequests][id] = _objectSpread(_objectSpread({}, this.metaComplete(id, resolve, reject)), {}, {
        id,
        request,
        url
      });
      this.updateIconMeta();
      this.popupOpen();
    });
  }

  getAuthRequest(id) {
    return _classPrivateFieldLooseBase(this, _authRequests)[_authRequests][id];
  }

  getMetaRequest(id) {
    return _classPrivateFieldLooseBase(this, _metaRequests)[_metaRequests][id];
  }

  getSignRequest(id) {
    return _classPrivateFieldLooseBase(this, _signRequests)[_signRequests][id];
  } // List all providers the extension is exposing


  rpcListProviders() {
    return Promise.resolve(Object.keys(_classPrivateFieldLooseBase(this, _providers)[_providers]).reduce((acc, key) => {
      acc[key] = _classPrivateFieldLooseBase(this, _providers)[_providers][key].meta;
      return acc;
    }, {}));
  }

  rpcSend(request, port) {
    const provider = _classPrivateFieldLooseBase(this, _injectedProviders)[_injectedProviders].get(port);

    assert(provider, 'Cannot call pub(rpc.subscribe) before provider is set');
    return provider.send(request.method, request.params);
  } // Start a provider, return its meta


  rpcStartProvider(key, port) {
    assert(Object.keys(_classPrivateFieldLooseBase(this, _providers)[_providers]).includes(key), `Provider ${key} is not exposed by extension`);

    if (_classPrivateFieldLooseBase(this, _injectedProviders)[_injectedProviders].get(port)) {
      return Promise.resolve(_classPrivateFieldLooseBase(this, _providers)[_providers][key].meta);
    } // Instantiate the provider


    _classPrivateFieldLooseBase(this, _injectedProviders)[_injectedProviders].set(port, _classPrivateFieldLooseBase(this, _providers)[_providers][key].start()); // Close provider connection when page is closed


    port.onDisconnect.addListener(() => {
      const provider = _classPrivateFieldLooseBase(this, _injectedProviders)[_injectedProviders].get(port);

      if (provider) {
        provider.disconnect().catch(console.error);
      }

      _classPrivateFieldLooseBase(this, _injectedProviders)[_injectedProviders].delete(port);
    });
    return Promise.resolve(_classPrivateFieldLooseBase(this, _providers)[_providers][key].meta);
  }

  rpcSubscribe({
    method,
    params,
    type
  }, cb, port) {
    const provider = _classPrivateFieldLooseBase(this, _injectedProviders)[_injectedProviders].get(port);

    assert(provider, 'Cannot call pub(rpc.subscribe) before provider is set');
    return provider.subscribe(type, method, params, cb);
  }

  rpcSubscribeConnected(_request, cb, port) {
    const provider = _classPrivateFieldLooseBase(this, _injectedProviders)[_injectedProviders].get(port);

    assert(provider, 'Cannot call pub(rpc.subscribeConnected) before provider is set');
    cb(null, provider.isConnected); // Immediately send back current isConnected

    provider.on('connected', () => cb(null, true));
    provider.on('disconnected', () => cb(null, false));
  }

  rpcUnsubscribe(request, port) {
    const provider = _classPrivateFieldLooseBase(this, _injectedProviders)[_injectedProviders].get(port);

    assert(provider, 'Cannot call pub(rpc.unsubscribe) before provider is set');
    return provider.unsubscribe(request.type, request.method, request.subscriptionId);
  }

  saveMetadata(meta) {
    _classPrivateFieldLooseBase(this, _metaStore)[_metaStore].set(meta.genesisHash, meta);

    addMetadata(meta);
  }

  setNotification(notification) {
    _classPrivateFieldLooseBase(this, _notification)[_notification] = notification;
    return true;
  }

  sign(url, request, account) {
    const id = getId();
    return new Promise((resolve, reject) => {
      _classPrivateFieldLooseBase(this, _signRequests)[_signRequests][id] = _objectSpread(_objectSpread({}, this.signComplete(id, resolve, reject)), {}, {
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