"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactIdenticon = _interopRequireDefault(require("@axia-js/react-identicon"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Identicon({
  className,
  iconTheme,
  onCopy,
  prefix,
  value
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactIdenticon.default, {
      className: "icon",
      onCopy: onCopy,
      prefix: prefix,
      size: 64,
      theme: iconTheme,
      value: value
    })
  });
}

var _default = (0, _styledComponents.default)(Identicon).withConfig({
  displayName: "Identicon",
  componentId: "sc-1thm8o9-0"
})(({
  theme
}) => `
  background: rgba(192, 192, 292, 0.25);
  border-radius: 50%;
  display: flex;
  justify-content: center;

  .container:before {
    box-shadow: none;
    background: ${theme.identiconBackground};
  }

  svg {
    circle:first-of-type {
      display: none;
    }
  }
`);

exports.default = _default;