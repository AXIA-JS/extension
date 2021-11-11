"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flushAllPromises = flushAllPromises;

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function setImmediate(fn) {
  setTimeout(fn, 0);
}

function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}