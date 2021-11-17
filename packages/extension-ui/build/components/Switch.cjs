"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Switch({
  checked,
  checkedLabel,
  className,
  onChange,
  uncheckedLabel
}) {
  const _onChange = (0, _react.useCallback)(event => onChange(event.target.checked), [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: uncheckedLabel
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        checked: checked,
        className: "checkbox",
        onChange: _onChange,
        type: "checkbox"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "slider"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: checkedLabel
    })]
  });
}

var _default = (0, _styledComponents.default)(Switch).withConfig({
  displayName: "Switch",
  componentId: "sc-1qhye2q-0"
})(({
  theme
}) => `
  label {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
    margin: 8px;
  }

  .checkbox {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider:before {
      transform: translateX(24px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.readonlyInputBackground};
    transition: 0.2s;
    border-radius: 100px;
    border: 1px solid ${theme.inputBorderColor};

    &:before {
      position: absolute;
      content: '';
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 3px;
      background-color: ${theme.primaryColor};
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`);

exports.default = _default;