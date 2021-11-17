"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ActionText({
  className,
  icon,
  onClick,
  text
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    onClick: onClick,
    children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
      icon: icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: text
    })]
  });
}

var _default = (0, _styledComponents.default)(ActionText).withConfig({
  displayName: "ActionText",
  componentId: "sc-n1bwo8-0"
})(({
  theme
}) => `
  cursor: pointer;

  span {
    color: ${theme.labelColor}
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    text-decoration-line: underline;
  }

  .svg-inline--fa {
    color: ${theme.iconNeutralColor};
    display: inline-block;
    margin-right: 0.3rem;
    position: relative;
    top: 2px;
  }
`);

exports.default = _default;