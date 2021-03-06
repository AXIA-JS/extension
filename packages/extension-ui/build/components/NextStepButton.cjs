"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = _interopRequireDefault(require("./Button.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function NextStepButton(_ref) {
  let {
    children
  } = _ref,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Button.default, _objectSpread(_objectSpread({}, props), {}, {
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
      className: "arrowRight",
      icon: _freeSolidSvgIcons.faArrowRight,
      size: "sm"
    })]
  }));
}

var _default = (0, _styledComponents.default)(NextStepButton).withConfig({
  displayName: "NextStepButton",
  componentId: "sc-1fg1l8t-0"
})(({
  theme
}) => `
  .arrowRight{
    float: right;
    margin-top: 4px;
    margin-right: 1px;
    color: ${theme.buttonTextColor};
  }
`);

exports.default = _default;