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
function Main({
  children,
  className
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("main", {
    className: className,
    children: children
  });
}

var _default = (0, _styledComponents.default)(Main).withConfig({
  displayName: "Main",
  componentId: "sc-lx1lhb-0"
})(({
  theme
}) => `
  display: flex;
  flex-direction: column;
  height: calc(100vh - 2px);
  background: ${theme.background};
  color: ${theme.textColor};
  font-size: ${theme.fontSize};
  line-height: ${theme.lineHeight};
  border: 1px solid ${theme.inputBorderColor};

  * {
    font-family: ${theme.fontFamily};
  }

  > * {
    padding-left: 24px;
    padding-right: 24px;
  }
`);

exports.default = _default;