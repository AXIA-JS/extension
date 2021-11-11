"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _networks = require("@axia-js/networks");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
var _default = _networks.selectableNetworks.filter(network => network.hasLedgerSupport);

exports.default = _default;