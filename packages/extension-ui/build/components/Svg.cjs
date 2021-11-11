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
const Svg = ({
  className
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  className: className
});

var _default = (0, _styledComponents.default)(Svg).withConfig({
  displayName: "Svg",
  componentId: "sc-q69rv1-0"
})(({
  src,
  theme
}) => `
  background: ${theme.textColor};
  display: inline-block;
  mask: url(${src});
  mask-size: cover;
`);

exports.default = _default;