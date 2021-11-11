// Copyright 2017-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'path';

import { createBundle } from '@axia-js/dev/config/rollup';

const pkgs = [
  '@axia-js/extension-dapp'
];

const external = [
  ...pkgs,
  '@axia-js/networks',
  '@axia-js/util',
  '@axia-js/util-crypto'
];

const entries = ['extension-base', 'extension-chains', 'extension-inject'].reduce((all, p) => ({
  ...all,
  [`@axia-js/${p}`]: path.resolve(process.cwd(), `packages/${p}/build`)
}), {});

const overrides = {};

export default pkgs.map((pkg) => {
  const override = (overrides[pkg] || {});

  return createBundle({
    external,
    pkg,
    ...override,
    entries: {
      ...entries,
      ...(override.entries || {})
    }
  });
});
