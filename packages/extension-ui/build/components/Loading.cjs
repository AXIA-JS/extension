"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Loading;

var _react = _interopRequireDefault(require("react"));

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Loading({
  children
}) {
  const {
    t
  } = (0, _useTranslation.default)();

  if (!children) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: t('... loading ...')
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: children
  });
}