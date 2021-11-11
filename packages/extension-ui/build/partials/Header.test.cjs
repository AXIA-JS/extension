"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("../../../../__mocks__/chrome.cjs");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _styledComponents = require("styled-components");

var _index = require("../components/index.cjs");

var _Header = _interopRequireDefault(require("./Header.cjs"));

var _MenuSettings = _interopRequireDefault(require("./MenuSettings.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
describe('Header component', () => {
  let wrapper; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  const mountHeader = (props = {}) => (0, _enzyme.mount)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.MemoryRouter, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styledComponents.ThemeProvider, {
      theme: _index.themes.dark,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, _objectSpread({}, props))
    })
  }));

  it('gear icon is not highlighted when settings are hidden', () => {
    wrapper = mountHeader({
      showSettings: true
    });
    expect(wrapper.find(_MenuSettings.default).length).toBe(0);
    expect(wrapper.find('.cogIcon').first().hasClass('selected')).toBe(false);
  });
  it('highlights gear icon when settings are toggled', () => {
    wrapper = mountHeader({
      showSettings: true
    });
    wrapper.find('div[data-toggle-settings]').simulate('click');
    expect(wrapper.find(_MenuSettings.default).length).toBe(1);
    expect(wrapper.find('.cogIcon').first().hasClass('selected')).toBe(true);
  });
});