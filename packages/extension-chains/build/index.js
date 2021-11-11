// Copyright 2019-2021 @axia-js/extension-chains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { Metadata, TypeRegistry } from '@axia-js/types';
import { base64Decode } from '@axia-js/util-crypto'; // imports chain details, generally metadata. For the generation of these,
// inside the api, run `yarn chain:info --ws <url>`

const definitions = new Map();
const expanded = new Map();
export function metadataExpand(definition, isPartial = false) {
  const cached = expanded.get(definition.genesisHash);

  if (cached && cached.specVersion === definition.specVersion) {
    return cached;
  }

  const {
    chain,
    genesisHash,
    icon,
    metaCalls,
    specVersion,
    ss58Format,
    tokenDecimals,
    tokenSymbol,
    types,
    userExtensions
  } = definition;
  const registry = new TypeRegistry();

  if (!isPartial) {
    registry.register(types);
  }

  registry.setChainProperties(registry.createType('ChainProperties', {
    ss58Format,
    tokenDecimals,
    tokenSymbol
  }));
  const isUnknown = genesisHash === '0x';
  let hasMetadata = false;

  if (metaCalls && !isPartial) {
    hasMetadata = true;
    const metadata = new Metadata(registry, base64Decode(metaCalls));
    const signedExtensions = metadata.asLatest.extrinsic.signedExtensions.toJSON();
    registry.setMetadata(metadata, signedExtensions, userExtensions);
  }

  const result = {
    definition,
    genesisHash: isUnknown ? undefined : genesisHash,
    hasMetadata,
    icon: icon || 'substrate',
    isUnknown,
    name: chain,
    registry,
    specVersion,
    ss58Format,
    tokenDecimals,
    tokenSymbol
  };

  if (result.genesisHash && !isPartial) {
    expanded.set(result.genesisHash, result);
  }

  return result;
}
export function findChain(definitions, genesisHash) {
  const def = definitions.find(def => def.genesisHash === genesisHash);
  return def ? metadataExpand(def) : null;
}
export function addMetadata(def) {
  definitions.set(def.genesisHash, def);
}
export function knownMetadata() {
  return [...definitions.values()];
}