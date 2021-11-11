// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringPair } from '@axia-js/keyring/types';
import type { SignerPayloadJSON } from '@axia-js/types/types';
import type { RequestSign } from './types';

import { TypeRegistry } from '@axia-js/types';

export default class RequestExtrinsicSign implements RequestSign {
  public readonly payload: SignerPayloadJSON;

  constructor (payload: SignerPayloadJSON) {
    this.payload = payload;
  }

  sign (registry: TypeRegistry, pair: KeyringPair): { signature: string } {
    return registry
      .createType('ExtrinsicPayload', this.payload, { version: this.payload.version })
      .sign(pair);
  }
}
