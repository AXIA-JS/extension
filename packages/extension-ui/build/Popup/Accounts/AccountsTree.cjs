"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccountsTree;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Account = _interopRequireDefault(require("./Account.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["parentName", "suri"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function AccountsTree(_ref) {
  var _account$children;

  let {
    parentName,
    suri
  } = _ref,
      account = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Account.default, _objectSpread(_objectSpread({}, account), {}, {
      parentName: parentName,
      suri: suri
    })), account === null || account === void 0 ? void 0 : (_account$children = account.children) === null || _account$children === void 0 ? void 0 : _account$children.map((child, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(AccountsTree, _objectSpread(_objectSpread({}, child), {}, {
      parentName: account.name
    }), `${index}:${child.address}`))]
  });
}