"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _networks = require("@axia-js/networks");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const hashes = _networks.selectableNetworks.filter(({
  genesisHash
}) => !!genesisHash.length).map(network => ({
  chain: network.displayName,
  genesisHash: network.genesisHash[0],
  icon: network.icon,
  ss58Format: network.prefix
}));

var _default = hashes;
exports.default = _default;