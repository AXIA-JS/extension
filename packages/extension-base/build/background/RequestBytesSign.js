// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { wrapBytes } from '@axia-js/extension-dapp/wrapBytes';
import { u8aToHex } from '@axia-js/util';
export default class RequestBytesSign {
  constructor(payload) {
    this.payload = void 0;
    this.payload = payload;
  }

  sign(_registry, pair) {
    return {
      signature: u8aToHex(pair.sign(wrapBytes(this.payload.data)))
    };
  }

}