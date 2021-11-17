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
function MenuItem({
  children,
  className = '',
  title
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className}${title ? ' isTitled' : ''}`,
    children: [title && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "itemTitle",
      children: title
    }), children]
  });
}

var _default = (0, _styledComponents.default)(MenuItem).withConfig({
  displayName: "MenuItem",
  componentId: "sc-xmh0bc-0"
})(({
  theme
}) => `
  min-width: 13rem;
  padding: 0 16px;
  max-width: 100%;

  > .itemTitle {
    margin: 0;
    width: 100%;
    font-size: ${theme.inputLabelFontSize};
    line-height: 14px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${theme.textColor};
    opacity: 0.65;
  }

  &+&.isTitled {
    margin-top: 16px;
  }
`);

exports.default = _default;