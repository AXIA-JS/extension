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
const ButtonArea = function ({
  children,
  className
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: children
  });
};

var _default = (0, _styledComponents.default)(ButtonArea).withConfig({
  displayName: "ButtonArea",
  componentId: "sc-1t7p0uz-0"
})(({
  theme
}) => `
  display: flex;
  flex-direction: row;
  background: ${theme.highlightedAreaBackground};
  border-top: 1px solid ${theme.inputBorderColor};
  padding: 12px 24px;
  margin-left: 0;
  margin-right: 0;

  & > button:not(:last-of-type) {
    margin-right: 8px;
  }
`);

exports.default = _default;