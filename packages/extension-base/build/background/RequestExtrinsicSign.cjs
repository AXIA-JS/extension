"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
class RequestExtrinsicSign {
  constructor(payload) {
    this.payload = void 0;
    this.payload = payload;
  }

  sign(registry, pair) {
    return registry.createType('ExtrinsicPayload', this.payload, {
      version: this.payload.version
    }).sign(pair);
  }

}

exports.default = RequestExtrinsicSign;