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
function Toast({
  className,
  content
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "snackbar-content",
      children: content
    })
  });
}

var _default = (0, _styledComponents.default)(Toast).withConfig({
  displayName: "Toast",
  componentId: "sc-mt0ct8-0"
})(["position:fixed;display:", ";height:40px;text-align:center;vertical-align:middle;line-height:7px;top:460px;left:calc(50% - 50px);&&{margin:auto;border-radius:25px;background:", ";}"], ({
  visible
}) => visible ? 'block' : 'none', ({
  theme
}) => theme.highlightedAreaBackground);

exports.default = _default;