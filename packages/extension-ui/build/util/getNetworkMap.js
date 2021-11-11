// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import chains from "./chains.js";
export default function getNetworkMap() {
  const res = new Map();
  chains.forEach(chain => {
    res.set(chain.genesisHash, chain.chain);
  });
  return res;
}