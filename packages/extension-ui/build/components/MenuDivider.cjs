"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function MenuDivider({
  className
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className
  });
}

var _default = (0, _styledComponents.default)(MenuDivider).withConfig({
  displayName: "MenuDivider",
  componentId: "sc-jt4y7r-0"
})(({
  theme
}) => `
  padding-top: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${theme.inputBorderColor};
`);

exports.default = _default;