// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
export default function (parentName, suri) {
  return `${parentName || ''}  ${suri || ''}`;
}