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
const List = ({
  children,
  className
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
  className: className,
  children: children
});

var _default = (0, _styledComponents.default)(List).withConfig({
  displayName: "List",
  componentId: "sc-eudvqu-0"
})(({
  theme
}) => `
  list-style: none;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  text-indent: -22px;
  margin-left: 21px;

  li {
    margin-bottom: 8px;
  }

  li::before {
    content: '\\2022';
    color: ${theme.primaryColor};
    font-size: 30px;
    font-weight: bold;
    margin-right: 10px;
    vertical-align: -20%;
  }
`);

exports.default = _default;