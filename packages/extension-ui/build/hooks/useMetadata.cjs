"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMetadata;

var _react = require("react");

var _messaging = require("../messaging.cjs");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useMetadata(genesisHash, isPartial) {
  const [chain, setChain] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (genesisHash) {
      (0, _messaging.getMetadata)(genesisHash, isPartial).then(setChain).catch(error => {
        console.error(error);
        setChain(null);
      });
    } else {
      setChain(null);
    }
  }, [genesisHash, isPartial]);
  return chain;
}