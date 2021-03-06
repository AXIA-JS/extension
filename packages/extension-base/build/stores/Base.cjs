"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _chrome = _interopRequireDefault(require("@axia-js/extension-inject/chrome"));

// Copyright 2019-2021 @axia-js/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
const lastError = type => {
  const error = _chrome.default.runtime.lastError;

  if (error) {
    console.error(`BaseStore.${type}:: runtime.lastError:`, error);
  }
};

var _prefix = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("prefix");

class BaseStore {
  constructor(prefix) {
    Object.defineProperty(this, _prefix, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix] = prefix ? `${prefix}:` : '';
  }

  all(update) {
    _chrome.default.storage.local.get(null, result => {
      lastError('all');
      Object.entries(result).filter(([key]) => key.startsWith((0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix])).forEach(([key, value]) => {
        update(key.replace((0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix], ''), value);
      });
    });
  }

  get(_key, update) {
    const key = `${(0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix]}${_key}`;

    _chrome.default.storage.local.get([key], result => {
      lastError('get');
      update(result[key]);
    });
  }

  remove(_key, update) {
    const key = `${(0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix]}${_key}`;

    _chrome.default.storage.local.remove(key, () => {
      lastError('remove');
      update && update();
    });
  }

  set(_key, value, update) {
    const key = `${(0, _classPrivateFieldLooseBase2.default)(this, _prefix)[_prefix]}${_key}`;

    _chrome.default.storage.local.set({
      [key]: value
    }, () => {
      lastError('set');
      update && update();
    });
  }

}

exports.default = BaseStore;