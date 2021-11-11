"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextDerivationPath = nextDerivationPath;

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function nextDerivationPath(accounts, parentAddress) {
  const siblingsCount = accounts.filter(account => account.parentAddress === parentAddress).length;
  return `//${siblingsCount}`;
}