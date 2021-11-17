"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _checkmark = _interopRequireDefault(require("../assets/checkmark.svg"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Checkbox({
  checked,
  className,
  label,
  onChange,
  onClick
}) {
  const _onChange = (0, _react.useCallback)(event => onChange && onChange(event.target.checked), [onChange]);

  const _onClick = (0, _react.useCallback)(() => onClick && onClick(), [onClick]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      children: [label, /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        checked: checked,
        onChange: _onChange,
        onClick: _onClick,
        type: "checkbox"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {})]
    })
  });
}

var _default = (0, _styledComponents.default)(Checkbox).withConfig({
  displayName: "Checkbox",
  componentId: "sc-1n3sp7g-0"
})(({
  theme
}) => `
  margin: ${theme.boxMargin};

  label {
    display: block;
    position: relative;
    cursor: pointer;
    user-select: none;
    padding-left: 24px;
    padding-top: 1px;
    color: ${theme.subTextColor};
    font-size: ${theme.fontSize};
    line-height: ${theme.lineHeight};

    & input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    & span {
      position: absolute;
      top: 4px;
      left: 0;
      height: 16px;
      width: 16px;
      border-radius: ${theme.borderRadius};
      background-color: ${theme.readonlyInputBackground};
      border: 1px solid ${theme.inputBorderColor};
      border: 1px solid ${theme.inputBorderColor};
      &:after {
        content: '';
        display: none;
        width: 13px;
        height: 10px;
        position: absolute;
        left: 1px;
        top: 2px;
        mask: url(${_checkmark.default});
        mask-size: cover;
        background: ${theme.primaryColor};
      }
    }

    &:hover input ~ span {
      background-color: ${theme.inputBackground};
    }

    input:checked ~ span:after {
      display: block;
    }
  }
`);

exports.default = _default;