"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("../../../../__mocks__/chrome.cjs");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _testUtils = require("react-dom/test-utils");

var _reactRouter = require("react-router");

var _styledComponents = require("styled-components");

var _index = require("../components/index.cjs");

var messaging = _interopRequireWildcard(require("../messaging.cjs"));

var _testHelpers = require("../testHelpers.cjs");

var _Export = _interopRequireDefault(require("./Export.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
describe('Export component', () => {
  let wrapper;
  const VALID_ADDRESS = 'HjoBp62cvsWDA3vtNMWxz6c9q13ReEHi9UGHK7JbZweH5g5';

  const enterPassword = (password = 'any password') => {
    wrapper.find('[data-export-password] input').simulate('change', {
      target: {
        value: password
      }
    });
  };

  beforeEach(() => {
    jest.spyOn(messaging, 'exportAccount').mockResolvedValue({
      exportedJson: {
        meta: {
          name: 'account_name'
        }
      }
    }); // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    wrapper = (0, _enzyme.mount)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.MemoryRouter, {
      initialEntries: [`/account/export/${VALID_ADDRESS}`],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styledComponents.ThemeProvider, {
        theme: _index.themes.dark,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
          path: "/account/export/:address",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Export.default, {})
        })
      })
    }));
  });
  it('creates export message on button press', async () => {
    enterPassword('passw0rd');
    wrapper.find('[data-export-button] button').simulate('click');
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    expect(messaging.exportAccount).toHaveBeenCalledWith(VALID_ADDRESS, 'passw0rd');
  });
  it('button is disabled before any password is typed', () => {
    expect(wrapper.find(_index.Button).prop('isDisabled')).toBe(true);
  });
  it('shows an error if the password is wrong', async () => {
    // silencing the following expected console.error
    console.error = jest.fn(); // eslint-disable-next-line @typescript-eslint/require-await

    jest.spyOn(messaging, 'exportAccount').mockImplementation(async () => {
      throw new Error('Unable to decode using the supplied passphrase');
    });
    enterPassword();
    wrapper.find('[data-export-button] button').simulate('click');
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    wrapper.update(); // the first message is "You are exporting your account. Keep it safe and don't share it with anyone."

    expect(wrapper.find('.warning-message').at(1).text()).toBe('Unable to decode using the supplied passphrase');
    expect(wrapper.find(_index.Button).prop('isDisabled')).toBe(true);
    expect(wrapper.find('InputWithLabel').first().prop('isError')).toBe(true);
  });
  it('shows no error when typing again after a wrong password', async () => {
    // silencing the following expected console.error
    console.error = jest.fn(); // eslint-disable-next-line @typescript-eslint/require-await

    jest.spyOn(messaging, 'exportAccount').mockImplementation(async () => {
      throw new Error('Unable to decode using the supplied passphrase');
    });
    enterPassword();
    wrapper.find('[data-export-button] button').simulate('click');
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    wrapper.update();
    enterPassword(); // the first message is "You are exporting your account. Keep it safe and don't share it with anyone."

    expect(wrapper.find('.warning-message')).toHaveLength(1);
    expect(wrapper.find(_index.Button).prop('isDisabled')).toBe(false);
    expect(wrapper.find('InputWithLabel').first().prop('isError')).toBe(false);
  });
  it('button is enabled after password is typed', async () => {
    enterPassword();
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    expect(wrapper.find(_index.Button).prop('isDisabled')).toBe(false);
  });
});