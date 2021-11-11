"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _arrowDown = _interopRequireDefault(require("../assets/arrow-down.svg"));

var _Label = _interopRequireDefault(require("./Label.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Dropdown({
  className,
  defaultValue,
  isDisabled,
  isFocussed,
  label,
  onBlur,
  onChange,
  options,
  value
}) {
  const _onChange = (0, _react.useCallback)(({
    target: {
      value
    }
  }) => onChange && onChange(value.trim()), [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
      className: className,
      label: label,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
        autoFocus: isFocussed,
        defaultValue: defaultValue || undefined,
        disabled: isDisabled,
        onBlur: onBlur,
        onChange: _onChange,
        value: value,
        children: options.map(({
          text,
          value
        }) => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: value,
          children: text
        }, value))
      })
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Dropdown).withConfig({
  displayName: "Dropdown",
  componentId: "sc-nmjgul-0"
})(({
  isError,
  label,
  theme
}) => `
  position: relative;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: ${theme.readonlyInputBackground};
    border-color: ${isError ? theme.errorBorderColor : theme.inputBorderColor};
    border-radius: ${theme.borderRadius};
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: ${isError ? theme.errorBorderColor : theme.textColor};
    display: block;
    font-family: ${theme.fontFamily};
    font-size: ${theme.fontSize};
    padding: 0.5rem 0.75rem;
    width: 100%;
    cursor: pointer;

    &:read-only {
      box-shadow: none;
      outline: none;
    }
  }

  label::after {
    content: '';
    position: absolute;
    top: ${label ? 'calc(50% + 14px)' : '50%'};
    transform: translateY(-50%);
    right: 12px;
    width: 8px;
    height: 6px;
    background: url(${_arrowDown.default}) center no-repeat;
    pointer-events: none;
  }
`));

exports.default = _default;