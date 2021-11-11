// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

const createConfig = require('./webpack.shared.cjs');

module.exports = createConfig(
  {
    extension: './src/extension.ts'
  },
  {
    '@axia-js/wasm-crypto-wasm/data.js': require.resolve('@axia-js/wasm-crypto-wasm/empty')
  }
);
