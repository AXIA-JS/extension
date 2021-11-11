// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { getMetadata } from "../messaging.js";
export default function useMetadata(genesisHash, isPartial) {
  const [chain, setChain] = useState(null);
  useEffect(() => {
    if (genesisHash) {
      getMetadata(genesisHash, isPartial).then(setChain).catch(error => {
        console.error(error);
        setChain(null);
      });
    } else {
      setChain(null);
    }
  }, [genesisHash, isPartial]);
  return chain;
}