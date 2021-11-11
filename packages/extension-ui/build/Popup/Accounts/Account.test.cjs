"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("../../../../../__mocks__/chrome.cjs");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _testUtils = require("react-dom/test-utils");

var _reactRouter = require("react-router");

var _styledComponents = require("styled-components");

var _index = require("../../components/index.cjs");

var messaging = _interopRequireWildcard(require("../../messaging.cjs"));

var _testHelpers = require("../../testHelpers.cjs");

var _Account = _interopRequireDefault(require("./Account.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
jest.spyOn(messaging, 'getAllMetatdata').mockResolvedValue([]);
describe('Account component', () => {
  let wrapper;
  const VALID_ADDRESS = 'HjoBp62cvsWDA3vtNMWxz6c9q13ReEHi9UGHK7JbZweH5g5'; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  const mountAccountComponent = (additionalAccountProperties, theme = _index.themes.dark) => (0, _enzyme.mount)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.MemoryRouter, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styledComponents.ThemeProvider, {
      theme: theme,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Account.default, _objectSpread({}, _objectSpread({
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
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
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
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
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
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
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
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    expect(wrapper.find('a.menuItem').length).toBe(2);
    expect(wrapper.find('a.menuItem').at(0).text()).toBe('Rename');
    expect(wrapper.find('a.menuItem').at(1).text()).toBe('Forget Account');
    expect(wrapper.find('.genesisSelection').exists()).toBe(false);
  });
});