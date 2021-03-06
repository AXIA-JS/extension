// Copyright 2019-2021 @axia-js/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BaseStore from "./Base.js";
export default class AccountsStore extends BaseStore {
  constructor() {
    super(null);
  }

  set(key, value, update) {
    // shortcut, don't save testing accounts in extension storage
    if (key.startsWith('account:') && value.meta && value.meta.isTesting) {
      update && update();
      return;
    }

    super.set(key, value, update);
  }

}