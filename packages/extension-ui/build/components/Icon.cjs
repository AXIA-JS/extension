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
function Icon({
  className = '',
  icon,
  onClick
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `${className} icon`,
    onClick: onClick,
    children: icon
  });
}

var _default = (0, _styledComponents.default)(Icon).withConfig({
  displayName: "Icon",
  componentId: "sc-c8ukvf-0"
})(({
  onClick
}) => `
  background: white;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: ${onClick ? 'pointer' : 'inherit'};
  text-align: center;
`);

exports.default = _default;