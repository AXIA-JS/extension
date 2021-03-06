// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
// External to class, this.# is not private enough (yet)
let sendRequest;
export default class Accounts {
  constructor(_sendRequest) {
    sendRequest = _sendRequest;
  }

  get(anyType) {
    return sendRequest('pub(accounts.list)', {
      anyType
    });
  }

  subscribe(cb) {
    sendRequest('pub(accounts.subscribe)', null, cb).catch(error => console.error(error));
    return () => {// FIXME we need the ability to unsubscribe
    };
  }

}