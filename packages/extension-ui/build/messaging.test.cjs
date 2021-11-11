"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("../../../__mocks__/chrome.cjs");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _enzyme = require("enzyme");

var _chrome2 = _interopRequireDefault(require("@axia-js/extension-inject/chrome"));

var _messaging = require("./messaging.cjs");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
describe('messaging sends message to background via extension port for', () => {
  test('exportAccount', () => {
    const callback = jest.fn();

    _chrome2.default.runtime.connect().onMessage.addListener(callback);

    (0, _messaging.exportAccount)('HjoBp62cvsWDA3vtNMWxz6c9q13ReEHi9UGHK7JbZweH5g5', 'passw0rd').catch(console.error);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({
      message: 'pri(accounts.export)',
      request: {
        address: 'HjoBp62cvsWDA3vtNMWxz6c9q13ReEHi9UGHK7JbZweH5g5',
        password: 'passw0rd'
      }
    }));
  });
});