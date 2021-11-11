"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNetworkMap;

var _chains = _interopRequireDefault(require("./chains.cjs"));

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getNetworkMap() {
  const res = new Map();

  _chains.default.forEach(chain => {
    res.set(chain.genesisHash, chain.chain);
  });

  return res;
}