"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TextAreaWithLabel;

var _react = _interopRequireWildcard(require("react"));

var _Label = _interopRequireDefault(require("./Label.cjs"));

var _TextInputs = require("./TextInputs.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function TextAreaWithLabel({
  className,
  isError,
  isFocused,
  isReadOnly,
  label,
  onChange,
  rowsCount,
  value
}) {
  const _onChange = (0, _react.useCallback)(({
    target: {
      value
    }
  }) => {
    onChange && onChange(value);
  }, [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
    className: className,
    label: label,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextInputs.TextArea, {
      autoCapitalize: "off",
      autoCorrect: "off",
      autoFocus: isFocused,
      onChange: _onChange,
      readOnly: isReadOnly,
      rows: rowsCount || 2,
      spellCheck: false,
      value: value,
      withError: isError
    })
  });
}