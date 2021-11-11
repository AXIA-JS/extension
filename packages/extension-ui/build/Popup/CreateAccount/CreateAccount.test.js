// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import "../../../../../__mocks__/chrome.js";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from 'styled-components';
import { ActionContext, ActionText, Button, themes } from "../../components/index.js";
import * as messaging from "../../messaging.js";
import { Header } from "../../partials/index.js";
import { flushAllPromises } from "../../testHelpers.js";
import CreateAccount from "./index.js"; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call

import { jsx as _jsx } from "react/jsx-runtime";
configure({
  adapter: new Adapter()
});
describe('Create Account', () => {
  let wrapper;
  let onActionStub;
  const exampleAccount = {
    address: 'HjoBp62cvsWDA3vtNMWxz6c9q13ReEHi9UGHK7JbZweH5g5',
    seed: 'horse battery staple correct'
  }; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  const mountComponent = () => mount( /*#__PURE__*/_jsx(ActionContext.Provider, {
    value: onActionStub,
    children: /*#__PURE__*/_jsx(ThemeProvider, {
      theme: themes.dark,
      children: /*#__PURE__*/_jsx(CreateAccount, {})
    })
  }));

  const check = input => input.simulate('change', {
    target: {
      checked: true
    }
  });

  const type = async (input, value) => {
    input.simulate('change', {
      target: {
        value
      }
    });
    await act(flushAllPromises);
    wrapper.update();
  };

  const enterName = name => type(wrapper.find('input').first(), name);

  const password = password => () => type(wrapper.find('input[type="password"]').first(), password);

  const repeat = password => () => type(wrapper.find('input[type="password"]').last(), password);

  beforeEach(async () => {
    onActionStub = jest.fn();
    jest.spyOn(messaging, 'createSeed').mockResolvedValue(exampleAccount);
    jest.spyOn(messaging, 'createAccountSuri').mockResolvedValue(true);
    wrapper = mountComponent();
    await act(flushAllPromises);
    wrapper.update();
  });
  describe('Phase 1', () => {
    it('shows seed phrase in textarea', () => {
      expect(wrapper.find('textarea').text()).toBe(exampleAccount.seed);
    });
    it('next step button is disabled when checkbox is not checked', () => {
      expect(wrapper.find(Button).prop('isDisabled')).toBe(true);
    });
    it('action text is "Cancel"', () => {
      expect(wrapper.find(Header).find(ActionText).text()).toBe('Cancel');
    });
    it('clicking "Cancel" redirects to main screen', () => {
      wrapper.find(Header).find(ActionText).simulate('click');
      expect(onActionStub).toBeCalledWith('/');
    });
    it('checking the checkbox enables the Next button', () => {
      check(wrapper.find('input[type="checkbox"]'));
      expect(wrapper.find(Button).prop('isDisabled')).toBe(false);
    });
    it('clicking on Next activates phase 2', () => {
      check(wrapper.find('input[type="checkbox"]'));
      wrapper.find('button').simulate('click');
      expect(wrapper.find(Header).text()).toBe('Create an account2/2Cancel');
    });
  });
  describe('Phase 2', () => {
    beforeEach(async () => {
      check(wrapper.find('input[type="checkbox"]'));
      wrapper.find('button').simulate('click');
      await act(flushAllPromises);
      wrapper.update();
    });
    it('saves account with provided network, name and password', async () => {
      const axialunarGenesis = '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe';
      wrapper.find('select').simulate('change', {
        target: {
          value: axialunarGenesis
        }
      });
      await act(flushAllPromises);
      wrapper.update();
      await enterName('abc').then(password('abcdef')).then(repeat('abcdef'));
      wrapper.find('[data-button-action="add new root"] button').simulate('click');
      await act(flushAllPromises);
      expect(messaging.createAccountSuri).toBeCalledWith('abc', 'abcdef', exampleAccount.seed, 'sr25519', axialunarGenesis);
      expect(onActionStub).toBeCalledWith('/');
    });
  });
});