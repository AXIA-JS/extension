"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Bytes({
  bytes,
  className,
  url
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("table", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("tbody", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "label",
          children: t('from')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "data",
          children: url
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "label",
          children: t('bytes')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "data",
          children: bytes
        })]
      })]
    })
  });
}

var _default = (0, _styledComponents.default)(Bytes).withConfig({
  displayName: "Bytes",
  componentId: "sc-neubxn-0"
})(["border:0;display:block;font-size:0.75rem;margin-top:0.75rem;td.data{max-width:0;overflow:hidden;text-align:left;text-overflow:ellipsis;vertical-align:middle;width:100%;pre{font-family:inherit;font-size:0.75rem;margin:0;}}td.label{opacity:0.5;padding:0 0.5rem;text-align:right;vertical-align:middle;white-space:nowrap;}"]);

exports.default = _default;