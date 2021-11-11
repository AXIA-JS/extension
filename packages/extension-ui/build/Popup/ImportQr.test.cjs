"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("../../../../__mocks__/chrome.cjs");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _testUtils = require("react-dom/test-utils");

var _reactRouter = require("react-router");

var _index = require("../components/index.cjs");

var messaging = _interopRequireWildcard(require("../messaging.cjs"));

var _testHelpers = require("../testHelpers.cjs");

var _ImportQr = _interopRequireDefault(require("./ImportQr.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const mockedAccount = {
  content: '12bxf6QJS5hMJgwbJMDjFot1sq93EvgQwyuPWENr9SzJfxtN',
  expectedBannerChain: 'AXIACoin',
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  isAddress: true,
  name: 'My AXIACoin Account'
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});

const typeName = async (wrapper, value) => {
  wrapper.find('input').first().simulate('change', {
    target: {
      value
    }
  });
  await (0, _testUtils.act)(_testHelpers.flushAllPromises);
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
    wrapper = (0, _enzyme.mount)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.MemoryRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ImportQr.default, {})
    }));
    (0, _testUtils.act)(() => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      wrapper.find('QrScanAddress').first().prop('onScan')(mockedAccount);
    });
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
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
    expect(wrapper.find(_index.Button).prop('isDisabled')).toBe(false);
  });
  it('displays and error and the button is disabled with a short name', async () => {
    await typeName(wrapper, 'a');
    expect(wrapper.find('.warning-message').first().text()).toBe('Account name is too short');
    expect(wrapper.find(_index.Button).prop('isDisabled')).toBe(true);
  });
  it('has no error message and button enabled with a long name', async () => {
    const longName = 'aaa';
    await typeName(wrapper, 'a');
    await typeName(wrapper, longName);
    expect(wrapper.find('.warning-message')).toHaveLength(0);
    expect(wrapper.find(_index.Button).prop('isDisabled')).toBe(false);
    expect(wrapper.find('Name span').text()).toEqual(longName);
  });
  it('shows the external name in the input field', () => {
    expect(wrapper.find('input').prop('value')).toBe(mockedAccount.name);
  });
  it('creates the external account', async () => {
    jest.spyOn(messaging, 'createAccountExternal').mockResolvedValue(false);
    wrapper.find(_index.Button).simulate('click');
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    expect(messaging.createAccountExternal).toHaveBeenCalledWith(mockedAccount.name, mockedAccount.content, mockedAccount.genesisHash);
  });
});