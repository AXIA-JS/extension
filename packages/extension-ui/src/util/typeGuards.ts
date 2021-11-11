// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringPair$Json } from '@axia-js/keyring/types';
import type { KeyringPairs$Json } from '@axia-js/ui-keyring/types';

export function isKeyringPairs$Json (json: KeyringPair$Json | KeyringPairs$Json): json is KeyringPairs$Json {
  return (json.encoding.content).includes('batch-pkcs8');
}
