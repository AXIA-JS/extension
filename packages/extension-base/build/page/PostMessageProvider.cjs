"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _eventemitter2 = _interopRequireDefault(require("eventemitter3"));

var _util = require("@axia-js/util");

// Copyright 2019-2021 @axia-js/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
const l = (0, _util.logger)('PostMessageProvider');
// External to class, this.# is not private enough (yet)
let sendRequest;
/**
 * @name PostMessageProvider
 *
 * @description Extension provider to be used by dapps
 */

var _eventemitter = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("eventemitter");

var _isConnected = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("isConnected");

var _subscriptions = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("subscriptions");

class PostMessageProvider {
  // Whether or not the actual extension background provider is connected
  // Subscription IDs are (historically) not guaranteed to be globally unique;
  // only unique for a given subscription method; which is why we identify
  // the subscriptions based on subscription id + type
  // {[(type,subscriptionId)]: callback}

  /**
   * @param {function}  sendRequest  The function to be called to send requests to the node
   * @param {function}  subscriptionNotificationHandler  Channel for receiving subscription messages
   */
  constructor(_sendRequest) {
    Object.defineProperty(this, _eventemitter, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _isConnected, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _subscriptions, {
      writable: true,
      value: {}
    });
    (0, _classPrivateFieldLooseBase2.default)(this, _eventemitter)[_eventemitter] = new _eventemitter2.default();
    sendRequest = _sendRequest;
  }
  /**
   * @description Returns a clone of the object
   */


  clone() {
    return new PostMessageProvider(sendRequest);
  }
  /**
   * @description Manually disconnect from the connection, clearing autoconnect logic
   */
  // eslint-disable-next-line @typescript-eslint/require-await


  async connect() {
    // FIXME This should see if the extension's state's provider can disconnect
    console.error('PostMessageProvider.disconnect() is not implemented.');
  }
  /**
   * @description Manually disconnect from the connection, clearing autoconnect logic
   */
  // eslint-disable-next-line @typescript-eslint/require-await


  async disconnect() {
    // FIXME This should see if the extension's state's provider can disconnect
    console.error('PostMessageProvider.disconnect() is not implemented.');
  }
  /**
   * @summary `true` when this provider supports subscriptions
   */


  get hasSubscriptions() {
    // FIXME This should see if the extension's state's provider has subscriptions
    return true;
  }
  /**
   * @summary Whether the node is connected or not.
   * @return {boolean} true if connected
   */


  get isConnected() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _isConnected)[_isConnected];
  }

  listProviders() {
    return sendRequest('pub(rpc.listProviders)', undefined);
  }
  /**
   * @summary Listens on events after having subscribed using the [[subscribe]] function.
   * @param  {ProviderInterfaceEmitted} type Event
   * @param  {ProviderInterfaceEmitCb}  sub  Callback
   * @return unsubscribe function
   */


  on(type, sub) {
    (0, _classPrivateFieldLooseBase2.default)(this, _eventemitter)[_eventemitter].on(type, sub);

    return () => {
      (0, _classPrivateFieldLooseBase2.default)(this, _eventemitter)[_eventemitter].removeListener(type, sub);
    };
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  async send(method, params, subscription) {
    if (subscription) {
      const {
        callback,
        type
      } = subscription;
      const id = await sendRequest('pub(rpc.subscribe)', {
        method,
        params,
        type
      }, res => {
        subscription.callback(null, res);
      });
      (0, _classPrivateFieldLooseBase2.default)(this, _subscriptions)[_subscriptions][`${type}::${id}`] = callback;
      return id;
    }

    return sendRequest('pub(rpc.send)', {
      method,
      params
    });
  }
  /**
   * @summary Spawn a provider on the extension background.
   */


  async startProvider(key) {
    // Disconnect from the previous provider
    (0, _classPrivateFieldLooseBase2.default)(this, _isConnected)[_isConnected] = false;

    (0, _classPrivateFieldLooseBase2.default)(this, _eventemitter)[_eventemitter].emit('disconnected');

    const meta = await sendRequest('pub(rpc.startProvider)', key); // eslint-disable-next-line @typescript-eslint/no-floating-promises

    sendRequest('pub(rpc.subscribeConnected)', null, connected => {
      (0, _classPrivateFieldLooseBase2.default)(this, _isConnected)[_isConnected] = connected;

      if (connected) {
        (0, _classPrivateFieldLooseBase2.default)(this, _eventemitter)[_eventemitter].emit('connected');
      } else {
        (0, _classPrivateFieldLooseBase2.default)(this, _eventemitter)[_eventemitter].emit('disconnected');
      }

      return true;
    });
    return meta;
  }

  subscribe(type, method, params, callback) {
    return this.send(method, params, {
      callback,
      type
    });
  }
  /**
   * @summary Allows unsubscribing to subscriptions made with [[subscribe]].
   */


  async unsubscribe(type, method, id) {
    const subscription = `${type}::${id}`; // FIXME This now could happen with re-subscriptions. The issue is that with a re-sub
    // the assigned id now does not match what the API user originally received. It has
    // a slight complication in solving - since we cannot rely on the send id, but rather
    // need to find the actual subscription id to map it

    if ((0, _util.isUndefined)((0, _classPrivateFieldLooseBase2.default)(this, _subscriptions)[_subscriptions][subscription])) {
      l.debug(() => `Unable to find active subscription=${subscription}`);
      return false;
    }

    delete (0, _classPrivateFieldLooseBase2.default)(this, _subscriptions)[_subscriptions][subscription];
    return this.send(method, [id]);
  }

}

exports.default = PostMessageProvider;