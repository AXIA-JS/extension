// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import "../../../../../__mocks__/chrome.js";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthorizeReqContext, Icon, themes } from "../../components/index.js";
import { Header } from "../../partials/index.js";
import Request from "./Request.js";
import Authorize from "./index.js"; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call

import { jsx as _jsx } from "react/jsx-runtime";
configure({
  adapter: new Adapter()
});
describe('Authorize', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const mountAuthorize = (authorizeRequests = []) => mount( /*#__PURE__*/_jsx(AuthorizeReqContext.Provider, {
    value: authorizeRequests,
    children: /*#__PURE__*/_jsx(ThemeProvider, {
      theme: themes.dark,
      children: /*#__PURE__*/_jsx(Authorize, {})
    })
  }));

  it('render component', () => {
    const wrapper = mountAuthorize();
    expect(wrapper.find(Header).text()).toBe('Authorize');
    expect(wrapper.find(Request).length).toBe(0);
  });
  it('render requests', () => {
    const wrapper = mountAuthorize([{
      id: '1',
      request: {
        origin: '???'
      },
      url: 'http://axia-js.org'
    }]);
    expect(wrapper.find(Request).length).toBe(1);
    expect(wrapper.find(Request).find('.tab-info').text()).toBe('An application, self-identifying as ??? is requesting access from http://axia-js.org.');
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
    expect(wrapper.find(Request).length).toBe(2);
    expect(wrapper.find(Icon).length).toBe(2);
    expect(wrapper.find(Request).at(1).find('.tab-info').text()).toBe('An application, self-identifying as abc is requesting access from http://axia-js.pl.');
    expect(wrapper.find('button.acceptButton').length).toBe(1);
  });
});