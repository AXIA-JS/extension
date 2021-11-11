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

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Warning({
  children,
  className = '',
  isBelowInput,
  isDanger
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className} ${isDanger ? 'danger' : ''} ${isBelowInput ? 'belowInput' : ''}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
      className: "warningImage",
      icon: _freeSolidSvgIcons.faExclamationTriangle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "warning-message",
      children: children
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Warning).withConfig({
  displayName: "Warning",
  componentId: "sc-1u3drz1-0"
})(({
  isDanger,
  theme
}) => `
  display: flex;
  flex-direction: row;
  padding-left: 18px;
  color: ${theme.subTextColor};
  margin-right: 20px;
  margin-top: 6px;
  border-left: ${`0.25rem solid ${theme.iconWarningColor}`};

  &.belowInput {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};

    &.danger {
      margin-top: -10px;
    }
  }

  &.danger {
    border-left-color: ${theme.buttonBackgroundDanger};
  }

  .warning-message {
    display: flex;
    align-items: center;
  }

  .warningImage {
    margin: 5px 10px 5px 0;
    color: ${isDanger ? theme.iconDangerColor : theme.iconWarningColor};
  }
`));

exports.default = _default;