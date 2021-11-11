"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ButtonWithSubtitle;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("./index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ButtonWithSubtitle({
  children,
  subTitle,
  title,
  to
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(StyledButton, {
    to: to,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: subTitle
    }), children]
  });
}

const StyledButton = (0, _styledComponents.default)(_index.Button).withConfig({
  displayName: "ButtonWithSubtitle__StyledButton",
  componentId: "sc-xuq8q1-0"
})(["button{padding-top:0;padding-bottom:0;}p{margin:0;font-size:15px;line-height:20px;}span{display:block;font-size:12px;line-height:16px;}"]);