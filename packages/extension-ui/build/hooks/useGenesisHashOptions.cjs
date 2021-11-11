"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = require("react");

var _messaging = require("../messaging.cjs");

var _chains = _interopRequireDefault(require("../util/chains.cjs"));

var _useTranslation = _interopRequireDefault(require("./useTranslation.cjs"));

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const RELAY_CHAIN = 'Relay Chain';

function _default() {
  const {
    t
  } = (0, _useTranslation.default)();
  const [metadataChains, setMetadatachains] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    (0, _messaging.getAllMetatdata)().then(metadataDefs => {
      const res = metadataDefs.map(metadata => ({
        text: metadata.chain,
        value: metadata.genesisHash
      }));
      setMetadatachains(res);
    }).catch(console.error);
  }, []);
  const hashes = (0, _react.useMemo)(() => [{
    text: t('Allow use on any chain'),
    value: ''
  }, // put the relay chains at the top
  ..._chains.default.filter(({
    chain
  }) => chain.includes(RELAY_CHAIN)).map(({
    chain,
    genesisHash
  }) => ({
    text: chain,
    value: genesisHash
  })), ..._chains.default.map(({
    chain,
    genesisHash
  }) => ({
    text: chain,
    value: genesisHash
  })) // remove the relay chains, they are at the top already
  .filter(({
    text
  }) => !text.includes(RELAY_CHAIN)).concat( // get any chain present in the metadata and not already part of chains
  ...metadataChains.filter(({
    value
  }) => {
    return !_chains.default.find(({
      genesisHash
    }) => genesisHash === value);
  })).sort((a, b) => a.text.localeCompare(b.text))], [metadataChains, t]);
  return hashes;
}