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
function Table({
  children,
  className = '',
  isFull
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("table", {
    className: `${className} ${isFull ? 'isFull' : ''}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
      children: children
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Table).withConfig({
  displayName: "Table",
  componentId: "sc-1mcqd9k-0"
})(({
  theme
}) => `
  border: 0;
  display: block;
  font-size: ${theme.labelFontSize};
  line-height: ${theme.labelLineHeight};
  margin-bottom: 1rem;

  &.isFull {
    height: 100%;
    overflow: auto;
  }

  td.data {
    max-width: 0;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    width: 100%;

    pre {
      font-family: inherit;
      font-size: 0.75rem;
      margin: 0;
    }
  }

  td.label {
    opacity: 0.5;
    padding: 0 0.5rem;
    text-align: right;
    vertical-align: top;
    white-space: nowrap;
  }

  details {
    cursor: pointer;
    max-width: 24rem;

    summary {
      text-overflow: ellipsis;
      outline: 0;
      overflow: hidden;
      white-space: nowrap;
    }

    &[open] summary {
      white-space: normal;
    }
  }
`));

exports.default = _default;