// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import "../../../../__mocks__/chrome.js";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import { Button } from "../components/index.js";
import * as messaging from "../messaging.js";
import { flushAllPromises } from "../testHelpers.js";
import ImportQr from "./ImportQr.js";
import { jsx as _jsx } from "react/jsx-runtime";
const mockedAccount = {
  content: '12bxf6QJS5hMJgwbJMDjFot1sq93EvgQwyuPWENr9SzJfxtN',
  expectedBannerChain: 'AXIA',
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  isAddress: true,
  name: 'My AXIA Account'
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
configure({
  adapter: new Adapter()
});

const typeName = async (wrapper, value) => {
  wrapper.find('input').first().simulate('change', {
    target: {
      value
    }
  });
  await act(flushAllPromises);
  wrapper.update();
};

jest.mock('@axia-js/react-qr', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    QrScanAddress: ({
      onScan
    }) => {
      return null;
    }
  };
});
describe('ImportQr component', () => {
  let wrapper;
  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    wrapper = mount( /*#__PURE__*/_jsx(MemoryRouter, {
      children: /*#__PURE__*/_jsx(ImportQr, {})
    }));
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      wrapper.find('QrScanAddress').first().prop('onScan')(mockedAccount);
    });
    await act(flushAllPromises);
    wrapper.update();
  });
  describe('Address component', () => {
    it('shows account as external', () => {
      expect(wrapper.find('Name').find('FontAwesomeIcon [data-icon="qrcode"]').exists()).toBe(true);
    });
    it('shows the correct name', () => {
      expect(wrapper.find('Name span').text()).toEqual(mockedAccount.name);
    });
    it('shows the correct address', () => {
      expect(wrapper.find('[data-field="address"]').text()).toEqual(mockedAccount.content);
    });
    it('shows the correct banner', () => {
      expect(wrapper.find('[data-field="chain"]').text()).toEqual(mockedAccount.expectedBannerChain);
    });
  });
  it('has the button enabled', () => {
    expect(wrapper.find(Button).prop('isDisabled')).toBe(false);
  });
  it('displays and error and the button is disabled with a short name', async () => {
    await typeName(wrapper, 'a');
    expect(wrapper.find('.warning-message').first().text()).toBe('Account name is too short');
    expect(wrapper.find(Button).prop('isDisabled')).toBe(true);
  });
  it('has no error message and button enabled with a long name', async () => {
    const longName = 'aaa';
    await typeName(wrapper, 'a');
    await typeName(wrapper, longName);
    expect(wrapper.find('.warning-message')).toHaveLength(0);
    expect(wrapper.find(Button).prop('isDisabled')).toBe(false);
    expect(wrapper.find('Name span').text()).toEqual(longName);
  });
  it('shows the external name in the input field', () => {
    expect(wrapper.find('input').prop('value')).toBe(mockedAccount.name);
  });
  it('creates the external account', async () => {
    jest.spyOn(messaging, 'createAccountExternal').mockResolvedValue(false);
    wrapper.find(Button).simulate('click');
    await act(flushAllPromises);
    expect(messaging.createAccountExternal).toHaveBeenCalledWith(mockedAccount.name, mockedAccount.content, mockedAccount.genesisHash);
  });
});