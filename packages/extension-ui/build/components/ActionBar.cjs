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
function ActionBar({
  children,
  className
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: children
  });
}

var _default = (0, _styledComponents.default)(ActionBar).withConfig({
  displayName: "ActionBar",
  componentId: "sc-1qp2k75-0"
})(["align-content:flex-end;display:flex;justify-content:space-between;padding:0.25rem;text-align:right;a{cursor:pointer;}a+a{margin-left:0.75rem;}"]);

exports.default = _default;