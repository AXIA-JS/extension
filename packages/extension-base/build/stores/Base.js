import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2019-2021 @axia-js/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
import chrome from '@axia-js/extension-inject/chrome';

const lastError = type => {
  const error = chrome.runtime.lastError;

  if (error) {
    console.error(`BaseStore.${type}:: runtime.lastError:`, error);
  }
};

var _prefix = /*#__PURE__*/_classPrivateFieldLooseKey("prefix");

export default class BaseStore {
  constructor(prefix) {
    Object.defineProperty(this, _prefix, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _prefix)[_prefix] = prefix ? `${prefix}:` : '';
  }

  all(update) {
    chrome.storage.local.get(null, result => {
      lastError('all');
      Object.entries(result).filter(([key]) => key.startsWith(_classPrivateFieldLooseBase(this, _prefix)[_prefix])).forEach(([key, value]) => {
        update(key.replace(_classPrivateFieldLooseBase(this, _prefix)[_prefix], ''), value);
      });
    });
  }

  get(_key, update) {
    const key = `${_classPrivateFieldLooseBase(this, _prefix)[_prefix]}${_key}`;
    chrome.storage.local.get([key], result => {
      lastError('get');
      update(result[key]);
    });
  }

  remove(_key, update) {
    const key = `${_classPrivateFieldLooseBase(this, _prefix)[_prefix]}${_key}`;
    chrome.storage.local.remove(key, () => {
      lastError('remove');
      update && update();
    });
  }

  set(_key, value, update) {
    const key = `${_classPrivateFieldLooseBase(this, _prefix)[_prefix]}${_key}`;
    chrome.storage.local.set({
      [key]: value
    }, () => {
      lastError('set');
      update && update();
    });
  }

}