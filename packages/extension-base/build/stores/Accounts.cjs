"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Base = _interopRequireDefault(require("./Base.cjs"));

// Copyright 2019-2021 @axia-js/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
class AccountsStore extends _Base.default {
  constructor() {
    super(null);
  }

  set(key, value, update) {
    // shortcut, don't save testing accounts in extension storage
    if (key.startsWith('account:') && value.meta && value.meta.isTesting) {
      update && update();
      return;
    }

    super.set(key, value, update);
  }

}

exports.default = AccountsStore;