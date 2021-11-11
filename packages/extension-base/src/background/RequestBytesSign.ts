// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringPair } from '@axia-js/keyring/types';
import type { SignerPayloadRaw } from '@axia-js/types/types';
import type { RequestSign } from './types';

import { wrapBytes } from '@axia-js/extension-dapp/wrapBytes';
import { TypeRegistry } from '@axia-js/types';
import { u8aToHex } from '@axia-js/util';

export default class RequestBytesSign implements RequestSign {
  public readonly payload: SignerPayloadRaw;

  constructor (payload: SignerPayloadRaw) {
    this.payload = payload;
  }

  sign (_registry: TypeRegistry, pair: KeyringPair): { signature: string } {
    return {
      signature: u8aToHex(
        pair.sign(
          wrapBytes(this.payload.data)
        )
      )
    };
  }
}
