"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function _default(parentName, suri) {
  return `${parentName || ''}  ${suri || ''}`;
}