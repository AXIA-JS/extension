// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
export function isKeyringPairs$Json(json) {
  return json.encoding.content.includes('batch-pkcs8');
}