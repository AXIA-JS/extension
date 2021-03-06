"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _defaults = require("@axia-js/extension-base/defaults");

var _utils = require("@axia-js/extension-base/utils");

var _phishing = require("@axia-js/phishing");

var _uiKeyring = _interopRequireDefault(require("@axia-js/ui-keyring"));

var _accounts = require("@axia-js/ui-keyring/observable/accounts");

var _util = require("@axia-js/util");

var _RequestBytesSign = _interopRequireDefault(require("../RequestBytesSign.cjs"));

var _RequestExtrinsicSign = _interopRequireDefault(require("../RequestExtrinsicSign.cjs"));

var _subscriptions = require("./subscriptions.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function transformAccounts(accounts, anyType = false) {
  return Object.values(accounts).filter(({
    json: {
      meta: {
        isHidden
      }
    }
  }) => !isHidden).filter(({
    type
  }) => anyType ? true : (0, _utils.canDerive)(type)).sort((a, b) => (a.json.meta.whenCreated || 0) - (b.json.meta.whenCreated || 0)).map(({
    json: {
      address,
      meta: {
        genesisHash,
        name
      }
    },
    type
  }) => ({
    address,
    genesisHash,
    name,
    type
  }));
}

var _state = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("state");

class Tabs {
  constructor(state) {
    Object.defineProperty(this, _state, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state] = state;
  }

  authorize(url, request) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].authorizeUrl(url, request);
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  accountsList(url, {
    anyType
  }) {
    return transformAccounts(_accounts.accounts.subject.getValue(), anyType);
  } // FIXME This looks very much like what we have in Extension


  accountsSubscribe(url, id, port) {
    const cb = (0, _subscriptions.createSubscription)(id, port);

    const subscription = _accounts.accounts.subject.subscribe(accounts => cb(transformAccounts(accounts)));

    port.onDisconnect.addListener(() => {
      (0, _subscriptions.unsubscribe)(id);
      subscription.unsubscribe();
    });
    return true;
  }

  getSigningPair(address) {
    const pair = _uiKeyring.default.getPair(address);

    (0, _util.assert)(pair, 'Unable to find keypair');
    return pair;
  }

  bytesSign(url, request) {
    const address = request.address;
    const pair = this.getSigningPair(address);
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].sign(url, new _RequestBytesSign.default(request), _objectSpread({
      address
    }, pair.meta));
  }

  extrinsicSign(url, request) {
    const address = request.address;
    const pair = this.getSigningPair(address);
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].sign(url, new _RequestExtrinsicSign.default(request), _objectSpread({
      address
    }, pair.meta));
  }

  metadataProvide(url, request) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].injectMetadata(url, request);
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  metadataList(url) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].knownMetadata.map(({
      genesisHash,
      specVersion
    }) => ({
      genesisHash,
      specVersion
    }));
  }

  rpcListProviders() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].rpcListProviders();
  }

  rpcSend(request, port) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].rpcSend(request, port);
  }

  rpcStartProvider(key, port) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].rpcStartProvider(key, port);
  }

  async rpcSubscribe(request, id, port) {
    const innerCb = (0, _subscriptions.createSubscription)(id, port);

    const cb = (_error, data) => innerCb(data);

    const subscriptionId = await (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].rpcSubscribe(request, cb, port);
    port.onDisconnect.addListener(() => {
      (0, _subscriptions.unsubscribe)(id);
      this.rpcUnsubscribe(_objectSpread(_objectSpread({}, request), {}, {
        subscriptionId
      }), port).catch(console.error);
    });
    return true;
  }

  rpcSubscribeConnected(request, id, port) {
    const innerCb = (0, _subscriptions.createSubscription)(id, port);

    const cb = (_error, data) => innerCb(data);

    (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].rpcSubscribeConnected(request, cb, port);

    port.onDisconnect.addListener(() => {
      (0, _subscriptions.unsubscribe)(id);
    });
    return Promise.resolve(true);
  }

  async rpcUnsubscribe(request, port) {
    return (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].rpcUnsubscribe(request, port);
  }

  redirectPhishingLanding(phishingWebsite) {
    const nonFragment = phishingWebsite.split('#')[0];
    const encodedWebsite = encodeURIComponent(nonFragment);
    const url = `${chrome.extension.getURL('index.html')}#${_defaults.PHISHING_PAGE_REDIRECT}/${encodedWebsite}`;
    chrome.tabs.query({
      url: nonFragment
    }, tabs => {
      tabs.map(({
        id
      }) => id).filter(id => (0, _util.isNumber)(id)).forEach(id => // eslint-disable-next-line no-void
      void chrome.tabs.update(id, {
        url
      }));
    });
  }

  async redirectIfPhishing(url) {
    const isInDenyList = await (0, _phishing.checkIfDenied)(url);

    if (isInDenyList) {
      this.redirectPhishingLanding(url);
      return true;
    }

    return false;
  }

  async handle(id, type, request, url, port) {
    if (type === 'pub(phishing.redirectIfDenied)') {
      return this.redirectIfPhishing(url);
    }

    if (type !== 'pub(authorize.tab)') {
      (0, _classPrivateFieldLooseBase2.default)(this, _state)[_state].ensureUrlAuthorized(url);
    }

    switch (type) {
      case 'pub(authorize.tab)':
        return this.authorize(url, request);

      case 'pub(accounts.list)':
        return this.accountsList(url, request);

      case 'pub(accounts.subscribe)':
        return this.accountsSubscribe(url, id, port);

      case 'pub(bytes.sign)':
        return this.bytesSign(url, request);

      case 'pub(extrinsic.sign)':
        return this.extrinsicSign(url, request);

      case 'pub(metadata.list)':
        return this.metadataList(url);

      case 'pub(metadata.provide)':
        return this.metadataProvide(url, request);

      case 'pub(rpc.listProviders)':
        return this.rpcListProviders();

      case 'pub(rpc.send)':
        return this.rpcSend(request, port);

      case 'pub(rpc.startProvider)':
        return this.rpcStartProvider(request, port);

      case 'pub(rpc.subscribe)':
        return this.rpcSubscribe(request, id, port);

      case 'pub(rpc.subscribeConnected)':
        return this.rpcSubscribeConnected(request, id, port);

      case 'pub(rpc.unsubscribe)':
        return this.rpcUnsubscribe(request, port);

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }

}

exports.default = Tabs;