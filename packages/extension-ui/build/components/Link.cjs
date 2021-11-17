"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Link({
  children,
  className = '',
  isDisabled,
  onClick,
  title,
  to
}) {
  if (isDisabled) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: `${className} isDisabled`,
      title: title,
      children: children
    });
  }

  return to ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
    className: className,
    onClick: onClick,
    title: title,
    to: to,
    children: children
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    className: className,
    href: "#",
    onClick: onClick,
    title: title,
    children: children
  });
}

var _default = (0, _styledComponents.default)(Link).withConfig({
  displayName: "Link",
  componentId: "sc-umj7kt-0"
})(({
  isDanger,
  theme
}) => `
  align-items: center;
  color: ${isDanger ? theme.textColorDanger : theme.textColor};
  display: flex;
  opacity: 0.85;
  text-decoration: none;
  vertical-align: middle;

  &:hover {
    color: ${isDanger ? theme.textColorDanger : theme.textColor};
    opacity: 1.0;
  }

  &:visited {
    color: ${isDanger ? theme.textColorDanger : theme.textColor};
  }

  &.isDisabled {
    opacity: 0.4;
  }
`);

exports.default = _default;