// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import "../../../../../__mocks__/chrome.js";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import { ActionContext, Button, Warning } from "../../components/index.js";
import * as messaging from "../../messaging.js";
import { flushAllPromises } from "../../testHelpers.js";
import ImportSeed from "./index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const account = {
  derivation: '/1',
  expectedAddress: '5GNg7RWeAAJuya4wTxb8aZf19bCWJroKuJNrhk4N3iYHNqTm',
  expectedAddressWithDerivation: '5DV3x9zgaXREUMTX7GgkP3ETeW4DQAznWTxg4kx2WivGuQLQ',
  name: 'My AXIA Account',
  password: 'somePassword',
  seed: 'upgrade multiply predict hip multiply march leg devote social outer oppose debris'
}; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call

configure({
  adapter: new Adapter()
});
jest.spyOn(messaging, 'getAllMetatdata').mockResolvedValue([]);

const typeSeed = async (wrapper, value) => {
  wrapper.find('textarea').first().simulate('change', {
    target: {
      value
    }
  });
  await act(flushAllPromises);
  wrapper.update();
};

const typeDerivationPath = async (wrapper, value) => {
  wrapper.find('input').first().simulate('change', {
    target: {
      value
    }
  });
  await act(flushAllPromises);
  wrapper.update();
};

describe('ImportSeed', () => {
  let wrapper;
  const onActionStub = jest.fn();

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    wrapper = mount( /*#__PURE__*/_jsx(ActionContext.Provider, {
      value: onActionStub,
      children: /*#__PURE__*/_jsx(MemoryRouter, {
        children: /*#__PURE__*/_jsx(ImportSeed, {})
      })
    }));
    await act(flushAllPromises);
    wrapper.update();
  });
  describe('Step 1', () => {
    it('first shows no error, no account, and next step button is disabled', () => {
      expect(wrapper.find('Name span').text()).toEqual('<unknown>');
      expect(wrapper.find('[data-field="address"]').text()).toEqual('<unknown>');
      expect(wrapper.find('.derivationPath').exists()).toBe(false);
      expect(wrapper.find(Warning).exists()).toBe(false);
      expect(wrapper.find(Button).prop('isDisabled')).toBe(true);
    });
    it('shows the expected account when correct seed is typed and next step button is enabled', async () => {
      jest.spyOn(messaging, 'validateSeed').mockResolvedValue({
        address: account.expectedAddress,
        suri: account.seed
      });
      await typeSeed(wrapper, account.seed);
      expect(wrapper.find(Warning).exists()).toBe(false);
      expect(wrapper.find(Button).prop('isDisabled')).toBe(false);
      expect(wrapper.find('Name span').text()).toEqual('<unknown>');
      expect(wrapper.find('[data-field="address"]').text()).toEqual(account.expectedAddress);
    });
    it('shows an error when incorrect seed is typed and next step button is enabled', async () => {
      // silencing the following expected console.error
      console.error = jest.fn(); // eslint-disable-next-line @typescript-eslint/require-await

      jest.spyOn(messaging, 'validateSeed').mockImplementation(async () => {
        throw new Error('Some test error message');
      });
      await typeSeed(wrapper, 'this is an invalid mnemonic seed');
      expect(wrapper.find(Warning).find('.warning-message').text()).toEqual('Invalid mnemonic seed');
      expect(wrapper.find(Button).prop('isDisabled')).toBe(true);
      expect(wrapper.find('Name span').text()).toEqual('<unknown>');
      expect(wrapper.find('[data-field="address"]').text()).toEqual('<unknown>');
    });
    it('shows an error when the seed is removed', async () => {
      await typeSeed(wrapper, 'asdf');
      await typeSeed(wrapper, '');
      expect(wrapper.find(Warning).find('.warning-message').text()).toEqual('Mnemonic needs to contain 12, 15, 18, 21, 24 words');
      expect(wrapper.find(Button).prop('isDisabled')).toBe(true);
    });
    it('shows the expected account with derivation when correct seed is typed and next step button is enabled', async () => {
      const suri = `${account.seed}${account.derivation}`;
      const validateCall = jest.spyOn(messaging, 'validateSeed').mockResolvedValue({
        address: account.expectedAddressWithDerivation,
        suri
      });
      await typeSeed(wrapper, account.seed);
      wrapper.find('.advancedToggle').simulate('click');
      await typeDerivationPath(wrapper, account.derivation);
      expect(validateCall).toHaveBeenLastCalledWith(suri);
      expect(wrapper.find(Warning).exists()).toBe(false);
      expect(wrapper.find(Button).prop('isDisabled')).toBe(false);
      expect(wrapper.find('Name span').text()).toEqual('<unknown>');
      expect(wrapper.find('[data-field="address"]').text()).toEqual(account.expectedAddressWithDerivation);
    });
    it('shows an error when derivation path is incorrect and next step button is disabled', async () => {
      const wrongPath = 'wrong';
      const suri = `${account.seed}${wrongPath}`; // silencing the following expected console.error

      console.error = jest.fn(); // eslint-disable-next-line @typescript-eslint/require-await

      const validateCall = jest.spyOn(messaging, 'validateSeed').mockImplementation(async () => {
        throw new Error('Some test error message');
      });
      await typeSeed(wrapper, account.seed);
      wrapper.find('.advancedToggle').simulate('click');
      await typeDerivationPath(wrapper, wrongPath);
      expect(validateCall).toHaveBeenLastCalledWith(suri);
      expect(wrapper.find(Warning).find('.warning-message').text()).toEqual('Invalid mnemonic seed or derivation path');
      expect(wrapper.find(Button).prop('isDisabled')).toBe(true);
      expect(wrapper.find('Name span').text()).toEqual('<unknown>');
      expect(wrapper.find('[data-field="address"]').text()).toEqual('<unknown>');
    });
    it('moves to the second step', async () => {
      jest.spyOn(messaging, 'validateSeed').mockResolvedValue({
        address: account.expectedAddress,
        suri: account.seed
      });
      await typeSeed(wrapper, account.seed);
      wrapper.find(Button).simulate('click');
      await act(flushAllPromises);
      wrapper.update();
      expect(wrapper.find(Button)).toHaveLength(2);
      expect(wrapper.find('Name span').text()).toEqual('<unknown>');
      expect(wrapper.find('[data-field="address"]').text()).toEqual(account.expectedAddress);
    });
    describe('Phase 2', () => {
      const suri = `${account.seed}${account.derivation}`;
      beforeEach(async () => {
        jest.spyOn(messaging, 'createAccountSuri').mockResolvedValue(true);
        jest.spyOn(messaging, 'validateSeed').mockResolvedValue({
          address: account.expectedAddressWithDerivation,
          suri
        });
        await typeSeed(wrapper, account.seed);
        wrapper.find('.advancedToggle').simulate('click');
        await typeDerivationPath(wrapper, account.derivation);
        wrapper.find(Button).simulate('click');
        await act(flushAllPromises);
        wrapper.update();
      });
      it('saves account with provided name and password', async () => {
        await enterName(account.name).then(password(account.password)).then(repeat(account.password));
        wrapper.find('[data-button-action="add new root"] button').simulate('click');
        await act(flushAllPromises);
        wrapper.update();
        expect(messaging.createAccountSuri).toBeCalledWith(account.name, account.password, suri, undefined, '');
        expect(onActionStub).toBeCalledWith('/');
      });
    });
  });
});