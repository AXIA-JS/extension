"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("../../../../../__mocks__/chrome.cjs");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _index = require("../../components/index.cjs");

var _index2 = require("../../partials/index.cjs");

var _Request = _interopRequireDefault(require("./Request.cjs"));

var _index3 = _interopRequireDefault(require("./index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
describe('Authorize', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const mountAuthorize = (authorizeRequests = []) => (0, _enzyme.mount)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.AuthorizeReqContext.Provider, {
    value: authorizeRequests,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styledComponents.ThemeProvider, {
      theme: _index.themes.dark,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {})
    })
  }));

  it('render component', () => {
    const wrapper = mountAuthorize();
    expect(wrapper.find(_index2.Header).text()).toBe('Authorize');
    expect(wrapper.find(_Request.default).length).toBe(0);
  });
  it('render requests', () => {
    const wrapper = mountAuthorize([{
      id: '1',
      request: {
        origin: '???'
      },
      url: 'http://axia-js.org'
    }]);
    expect(wrapper.find(_Request.default).length).toBe(1);
    expect(wrapper.find(_Request.default).find('.tab-info').text()).toBe('An application, self-identifying as ??? is requesting access from http://axia-js.org.');
  });
  it('render more request but just one accept button', () => {
    const wrapper = mountAuthorize([{
      id: '1',
      request: {
        origin: '???'
      },
      url: 'http://axia-js.org'
    }, {
      id: '2',
      request: {
        origin: 'abc'
      },
      url: 'http://axia-js.pl'
    }]);
    expect(wrapper.find(_Request.default).length).toBe(2);
    expect(wrapper.find(_index.Icon).length).toBe(2);
    expect(wrapper.find(_Request.default).at(1).find('.tab-info').text()).toBe('An application, self-identifying as abc is requesting access from http://axia-js.pl.');
    expect(wrapper.find('button.acceptButton').length).toBe(1);
  });
});