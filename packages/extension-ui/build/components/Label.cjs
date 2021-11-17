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
function Label({
  children,
  className,
  label
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
      children: label
    }), children]
  });
}

var _default = (0, _styledComponents.default)(Label).withConfig({
  displayName: "Label",
  componentId: "sc-vs6qy1-0"
})(({
  theme
}) => `
  color: ${theme.textColor};

  label {
    font-size: ${theme.inputLabelFontSize};
    line-height: 14px;
    letter-spacing: 0.04em;
    opacity: 0.65;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
`);

exports.default = _default;