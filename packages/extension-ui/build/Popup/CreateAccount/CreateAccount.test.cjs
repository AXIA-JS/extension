"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("../../../../../__mocks__/chrome.cjs");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _testUtils = require("react-dom/test-utils");

var _styledComponents = require("styled-components");

var _index = require("../../components/index.cjs");

var messaging = _interopRequireWildcard(require("../../messaging.cjs"));

var _index2 = require("../../partials/index.cjs");

var _testHelpers = require("../../testHelpers.cjs");

var _index3 = _interopRequireDefault(require("./index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
describe('Create Account', () => {
  let wrapper;
  let onActionStub;
  const exampleAccount = {
    address: 'HjoBp62cvsWDA3vtNMWxz6c9q13ReEHi9UGHK7JbZweH5g5',
    seed: 'horse battery staple correct'
  }; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  const mountComponent = () => (0, _enzyme.mount)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionContext.Provider, {
    value: onActionStub,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styledComponents.ThemeProvider, {
      theme: _index.themes.dark,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {})
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
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
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
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    wrapper.update();
  });
  describe('Phase 1', () => {
    it('shows seed phrase in textarea', () => {
      expect(wrapper.find('textarea').text()).toBe(exampleAccount.seed);
    });
    it('next step button is disabled when checkbox is not checked', () => {
      expect(wrapper.find(_index.Button).prop('isDisabled')).toBe(true);
    });
    it('action text is "Cancel"', () => {
      expect(wrapper.find(_index2.Header).find(_index.ActionText).text()).toBe('Cancel');
    });
    it('clicking "Cancel" redirects to main screen', () => {
      wrapper.find(_index2.Header).find(_index.ActionText).simulate('click');
      expect(onActionStub).toBeCalledWith('/');
    });
    it('checking the checkbox enables the Next button', () => {
      check(wrapper.find('input[type="checkbox"]'));
      expect(wrapper.find(_index.Button).prop('isDisabled')).toBe(false);
    });
    it('clicking on Next activates phase 2', () => {
      check(wrapper.find('input[type="checkbox"]'));
      wrapper.find('button').simulate('click');
      expect(wrapper.find(_index2.Header).text()).toBe('Create an account2/2Cancel');
    });
  });
  describe('Phase 2', () => {
    beforeEach(async () => {
      check(wrapper.find('input[type="checkbox"]'));
      wrapper.find('button').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.update();
    });
    it('saves account with provided network, name and password', async () => {
      const axialunarGenesis = '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe';
      wrapper.find('select').simulate('change', {
        target: {
          value: axialunarGenesis
        }
      });
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.update();
      await enterName('abc').then(password('abcdef')).then(repeat('abcdef'));
      wrapper.find('[data-button-action="add new root"] button').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      expect(messaging.createAccountSuri).toBeCalledWith('abc', 'abcdef', exampleAccount.seed, 'sr25519', axialunarGenesis);
      expect(onActionStub).toBeCalledWith('/');
    });
  });
});