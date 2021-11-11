import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import "../../../../../__mocks__/chrome.js";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { themes } from "../../components/index.js";
import * as messaging from "../../messaging.js";
import { flushAllPromises } from "../../testHelpers.js";
import Account from "./Account.js"; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call

import { jsx as _jsx } from "react/jsx-runtime";
configure({
  adapter: new Adapter()
});
jest.spyOn(messaging, 'getAllMetatdata').mockResolvedValue([]);
describe('Account component', () => {
  let wrapper;
  const VALID_ADDRESS = 'HjoBp62cvsWDA3vtNMWxz6c9q13ReEHi9UGHK7JbZweH5g5'; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  const mountAccountComponent = (additionalAccountProperties, theme = themes.dark) => mount( /*#__PURE__*/_jsx(MemoryRouter, {
    children: /*#__PURE__*/_jsx(ThemeProvider, {
      theme: theme,
      children: /*#__PURE__*/_jsx(Account, _objectSpread({}, _objectSpread({
        address: VALID_ADDRESS
      }, additionalAccountProperties)))
    })
  }));

  it('shows Export option if account is not external', async () => {
    wrapper = mountAccountComponent({
      isExternal: false,
      type: 'ed25519'
    });
    wrapper.find('.settings').first().simulate('click');
    await act(flushAllPromises);
    expect(wrapper.find('a.menuItem').length).toBe(4);
    expect(wrapper.find('a.menuItem').at(0).text()).toBe('Rename');
    expect(wrapper.find('a.menuItem').at(1).text()).toBe('Derive New Account');
    expect(wrapper.find('a.menuItem').at(2).text()).toBe('Export Account');
    expect(wrapper.find('a.menuItem').at(3).text()).toBe('Forget Account');
    expect(wrapper.find('.genesisSelection').exists()).toBe(true);
  });
  it('does not show Export option if account is external', async () => {
    wrapper = mountAccountComponent({
      isExternal: true,
      type: 'ed25519'
    });
    wrapper.find('.settings').first().simulate('click');
    await act(flushAllPromises);
    expect(wrapper.find('a.menuItem').length).toBe(2);
    expect(wrapper.find('a.menuItem').at(0).text()).toBe('Rename');
    expect(wrapper.find('a.menuItem').at(1).text()).toBe('Forget Account');
    expect(wrapper.find('.genesisSelection').exists()).toBe(true);
  });
  it('shows Derive option if account is of ethereum type', async () => {
    wrapper = mountAccountComponent({
      isExternal: false,
      type: 'ethereum'
    });
    wrapper.find('.settings').first().simulate('click');
    await act(flushAllPromises);
    expect(wrapper.find('a.menuItem').length).toBe(4);
    expect(wrapper.find('a.menuItem').at(0).text()).toBe('Rename');
    expect(wrapper.find('a.menuItem').at(1).text()).toBe('Derive New Account');
    expect(wrapper.find('a.menuItem').at(2).text()).toBe('Export Account');
    expect(wrapper.find('a.menuItem').at(3).text()).toBe('Forget Account');
    expect(wrapper.find('.genesisSelection').exists()).toBe(true);
  });
  it('does not show genesis hash selection dropsown if account is hardware', async () => {
    wrapper = mountAccountComponent({
      isExternal: true,
      isHardware: true
    });
    wrapper.find('.settings').first().simulate('click');
    await act(flushAllPromises);
    expect(wrapper.find('a.menuItem').length).toBe(2);
    expect(wrapper.find('a.menuItem').at(0).text()).toBe('Rename');
    expect(wrapper.find('a.menuItem').at(1).text()).toBe('Forget Account');
    expect(wrapper.find('.genesisSelection').exists()).toBe(false);
  });
});