// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { selectableNetworks } from '@axia-js/networks';
const hashes = selectableNetworks.filter(({
  genesisHash
}) => !!genesisHash.length).map(network => ({
  chain: network.displayName,
  genesisHash: network.genesisHash[0],
  icon: network.icon,
  ss58Format: network.prefix
}));
export default hashes;