import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import "../../../../__mocks__/chrome.js";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { themes } from "../components/index.js";
import Header from "./Header.js";
import Settings from "./MenuSettings.js"; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call

import { jsx as _jsx } from "react/jsx-runtime";
configure({
  adapter: new Adapter()
});
describe('Header component', () => {
  let wrapper; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  const mountHeader = (props = {}) => mount( /*#__PURE__*/_jsx(MemoryRouter, {
    children: /*#__PURE__*/_jsx(ThemeProvider, {
      theme: themes.dark,
      children: /*#__PURE__*/_jsx(Header, _objectSpread({}, props))
    })
  }));

  it('gear icon is not highlighted when settings are hidden', () => {
    wrapper = mountHeader({
      showSettings: true
    });
    expect(wrapper.find(Settings).length).toBe(0);
    expect(wrapper.find('.cogIcon').first().hasClass('selected')).toBe(false);
  });
  it('highlights gear icon when settings are toggled', () => {
    wrapper = mountHeader({
      showSettings: true
    });
    wrapper.find('div[data-toggle-settings]').simulate('click');
    expect(wrapper.find(Settings).length).toBe(1);
    expect(wrapper.find('.cogIcon').first().hasClass('selected')).toBe(true);
  });
});