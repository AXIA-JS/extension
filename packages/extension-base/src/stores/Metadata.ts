// Copyright 2019-2021 @axia-js/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MetadataDef } from '@axia-js/extension-inject/types';

import BaseStore from './Base';

export default class MetadataStore extends BaseStore<MetadataDef> {
  constructor () {
    super('metadata');
  }
}
