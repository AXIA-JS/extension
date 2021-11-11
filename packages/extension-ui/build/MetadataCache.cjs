"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSavedMeta = getSavedMeta;
exports.setSavedMeta = setSavedMeta;
// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const metadataGets = new Map();

function getSavedMeta(genesisHash) {
  return metadataGets.get(genesisHash);
}

function setSavedMeta(genesisHash, def) {
  return metadataGets.set(genesisHash, def);
}