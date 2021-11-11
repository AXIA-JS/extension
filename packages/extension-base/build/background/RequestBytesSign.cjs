"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wrapBytes = require("@axia-js/extension-dapp/wrapBytes");

var _util = require("@axia-js/util");

// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
class RequestBytesSign {
  constructor(payload) {
    this.payload = void 0;
    this.payload = payload;
  }

  sign(_registry, pair) {
    return {
      signature: (0, _util.u8aToHex)(pair.sign((0, _wrapBytes.wrapBytes)(this.payload.data)))
    };
  }

}

exports.default = RequestBytesSign;