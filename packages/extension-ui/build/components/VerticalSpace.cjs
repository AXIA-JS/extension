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
function VerticalSpace({
  className
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className
  });
}

var _default = (0, _styledComponents.default)(VerticalSpace).withConfig({
  displayName: "VerticalSpace",
  componentId: "sc-1pnnvnu-0"
})(["height:100%;"]);

exports.default = _default;