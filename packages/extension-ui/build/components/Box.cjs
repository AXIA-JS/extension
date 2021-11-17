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
function Box({
  banner,
  children,
  className
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
    className: className,
    children: [children, banner && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "banner",
      children: banner
    })]
  });
}

var _default = (0, _styledComponents.default)(Box).withConfig({
  displayName: "Box",
  componentId: "sc-bmnt5w-0"
})(({
  theme
}) => `
  background: ${theme.readonlyInputBackground};
  border: 1px solid ${theme.inputBorderColor};
  border-radius: ${theme.borderRadius};
  color: ${theme.subTextColor};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};
  margin: 0.75rem 24px;
  padding: ${theme.boxPadding};
  position: relative;

  .banner {
    background: darkorange;
    border-radius: 0 ${theme.borderRadius} 0 ${theme.borderRadius};
    color: white;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    position: absolute;
    right: 0;
    top: 0;
  }
`);

exports.default = _default;