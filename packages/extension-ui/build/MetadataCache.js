// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const metadataGets = new Map();
export function getSavedMeta(genesisHash) {
  return metadataGets.get(genesisHash);
}
export function setSavedMeta(genesisHash, def) {
  return metadataGets.set(genesisHash, def);
}