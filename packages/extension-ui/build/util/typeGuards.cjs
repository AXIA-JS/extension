"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKeyringPairs$Json = isKeyringPairs$Json;

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function isKeyringPairs$Json(json) {
  return json.encoding.content.includes('batch-pkcs8');
}