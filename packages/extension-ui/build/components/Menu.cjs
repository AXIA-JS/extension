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
function Menu({
  children,
  className,
  reference
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    ref: reference,
    children: children
  });
}

var _default = (0, _styledComponents.default)(Menu).withConfig({
  displayName: "Menu",
  componentId: "sc-1s6rfvf-0"
})(({
  theme
}) => `
  background: ${theme.popupBackground};
  border-radius: 4px;
  border: 1px solid ${theme.boxBorderColor};
  box-sizing: border-box;
  box-shadow: 0 0 10px ${theme.boxShadow};
  margin-top: 60px;
  padding: 16px 0;
  position: absolute;
  right: 0;
  z-index: 2;
`);

exports.default = _default;