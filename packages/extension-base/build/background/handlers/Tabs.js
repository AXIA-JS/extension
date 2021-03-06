import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { PHISHING_PAGE_REDIRECT } from '@axia-js/extension-base/defaults';
import { canDerive } from '@axia-js/extension-base/utils';
import { checkIfDenied } from '@axia-js/phishing';
import keyring from '@axia-js/ui-keyring';
import { accounts as accountsObservable } from '@axia-js/ui-keyring/observable/accounts';
import { assert, isNumber } from '@axia-js/util';
import RequestBytesSign from "../RequestBytesSign.js";
import RequestExtrinsicSign from "../RequestExtrinsicSign.js";
import { createSubscription, unsubscribe } from "./subscriptions.js";

function transformAccounts(accounts, anyType = false) {
  return Object.values(accounts).filter(({
    json: {
      meta: {
        isHidden
      }
    }
  }) => !isHidden).filter(({
    type
  }) => anyType ? true : canDerive(type)).sort((a, b) => (a.json.meta.whenCreated || 0) - (b.json.meta.whenCreated || 0)).map(({
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

var _state = /*#__PURE__*/_classPrivateFieldLooseKey("state");

export default class Tabs {
  constructor(state) {
    Object.defineProperty(this, _state, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _state)[_state] = state;
  }

  authorize(url, request) {
    return _classPrivateFieldLooseBase(this, _state)[_state].authorizeUrl(url, request);
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  accountsList(url, {
    anyType
  }) {
    return transformAccounts(accountsObservable.subject.getValue(), anyType);
  } // FIXME This looks very much like what we have in Extension


  accountsSubscribe(url, id, port) {
    const cb = createSubscription(id, port);
    const subscription = accountsObservable.subject.subscribe(accounts => cb(transformAccounts(accounts)));
    port.onDisconnect.addListener(() => {
      unsubscribe(id);
      subscription.unsubscribe();
    });
    return true;
  }

  getSigningPair(address) {
    const pair = keyring.getPair(address);
    assert(pair, 'Unable to find keypair');
    return pair;
  }

  bytesSign(url, request) {
    const address = request.address;
    const pair = this.getSigningPair(address);
    return _classPrivateFieldLooseBase(this, _state)[_state].sign(url, new RequestBytesSign(request), _objectSpread({
      address
    }, pair.meta));
  }

  extrinsicSign(url, request) {
    const address = request.address;
    const pair = this.getSigningPair(address);
    return _classPrivateFieldLooseBase(this, _state)[_state].sign(url, new RequestExtrinsicSign(request), _objectSpread({
      address
    }, pair.meta));
  }

  metadataProvide(url, request) {
    return _classPrivateFieldLooseBase(this, _state)[_state].injectMetadata(url, request);
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  metadataList(url) {
    return _classPrivateFieldLooseBase(this, _state)[_state].knownMetadata.map(({
      genesisHash,
      specVersion
    }) => ({
      genesisHash,
      specVersion
    }));
  }

  rpcListProviders() {
    return _classPrivateFieldLooseBase(this, _state)[_state].rpcListProviders();
  }

  rpcSend(request, port) {
    return _classPrivateFieldLooseBase(this, _state)[_state].rpcSend(request, port);
  }

  rpcStartProvider(key, port) {
    return _classPrivateFieldLooseBase(this, _state)[_state].rpcStartProvider(key, port);
  }

  async rpcSubscribe(request, id, port) {
    const innerCb = createSubscription(id, port);

    const cb = (_error, data) => innerCb(data);

    const subscriptionId = await _classPrivateFieldLooseBase(this, _state)[_state].rpcSubscribe(request, cb, port);
    port.onDisconnect.addListener(() => {
      unsubscribe(id);
      this.rpcUnsubscribe(_objectSpread(_objectSpread({}, request), {}, {
        subscriptionId
      }), port).catch(console.error);
    });
    return true;
  }

  rpcSubscribeConnected(request, id, port) {
    const innerCb = createSubscription(id, port);

    const cb = (_error, data) => innerCb(data);

    _classPrivateFieldLooseBase(this, _state)[_state].rpcSubscribeConnected(request, cb, port);

    port.onDisconnect.addListener(() => {
      unsubscribe(id);
    });
    return Promise.resolve(true);
  }

  async rpcUnsubscribe(request, port) {
    return _classPrivateFieldLooseBase(this, _state)[_state].rpcUnsubscribe(request, port);
  }

  redirectPhishingLanding(phishingWebsite) {
    const nonFragment = phishingWebsite.split('#')[0];
    const encodedWebsite = encodeURIComponent(nonFragment);
    const url = `${chrome.extension.getURL('index.html')}#${PHISHING_PAGE_REDIRECT}/${encodedWebsite}`;
    chrome.tabs.query({
      url: nonFragment
    }, tabs => {
      tabs.map(({
        id
      }) => id).filter(id => isNumber(id)).forEach(id => // eslint-disable-next-line no-void
      void chrome.tabs.update(id, {
        url
      }));
    });
  }

  async redirectIfPhishing(url) {
    const isInDenyList = await checkIfDenied(url);

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
      _classPrivateFieldLooseBase(this, _state)[_state].ensureUrlAuthorized(url);
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