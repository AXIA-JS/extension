"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _spinner = _interopRequireDefault(require("../assets/spinner.png"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Spinner({
  className = '',
  size = 'normal'
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
    className: `${className} ${size}Size`,
    src: _spinner.default
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Spinner).withConfig({
  displayName: "Spinner",
  componentId: "sc-1csqilc-0"
})(["bottom:0rem;height:3rem;left:50%;margin-left:-1.5rem;position:absolute;width:3rem;z-index:"]));

exports.default = _default;