"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = _interopRequireDefault(require("./Button.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BackButton({
  className,
  onClick
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
    className: className,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
      className: "arrowLeft",
      icon: _freeSolidSvgIcons.faArrowLeft,
      size: "sm"
    })
  });
}

var _default = (0, _styledComponents.default)(BackButton).withConfig({
  displayName: "BackButton",
  componentId: "sc-nyj14m-0"
})(({
  theme
}) => `
  background: ${theme.backButtonBackground};
  margin-right: 11px;
  width: 42px;

  .arrowLeft {
    color: ${theme.backButtonTextColor};
    display: block;
    margin: auto;
  }

  &:not(:disabled):hover {
    background: ${theme.backButtonBackgroundHover};
  }
`);

exports.default = _default;