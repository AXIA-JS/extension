// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Accounts from "./Accounts.js";
import Metadata from "./Metadata.js";
import PostMessageProvider from "./PostMessageProvider.js";
import Signer from "./Signer.js";
export default class {
  constructor(sendRequest) {
    this.accounts = void 0;
    this.metadata = void 0;
    this.provider = void 0;
    this.signer = void 0;
    this.accounts = new Accounts(sendRequest);
    this.metadata = new Metadata(sendRequest);
    this.provider = new PostMessageProvider(sendRequest);
    this.signer = new Signer(sendRequest);
  }

}