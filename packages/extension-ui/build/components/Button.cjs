"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Spinner = _interopRequireDefault(require("./Spinner.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Button({
  children,
  className = '',
  isBusy,
  isDisabled,
  onClick,
  to
}) {
  const _onClick = (0, _react.useCallback)(() => {
    if (isBusy || isDisabled) {
      return;
    }

    onClick && onClick();

    if (to) {
      window.location.hash = to;
    }
  }, [isBusy, isDisabled, onClick, to]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    className: `${className}${isDisabled || isBusy ? ' isDisabled' : ''}${isBusy ? ' isBusy' : ''}`,
    disabled: isDisabled || isBusy,
    onClick: _onClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "children",
      children: children
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "disabledOverlay"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.default, {
      className: "busyOverlay"
    })]
  });
}

var _default = (0, _styledComponents.default)(Button).withConfig({
  displayName: "Button",
  componentId: "sc-nrii50-0"
})(({
  isDanger,
  theme
}) => `
  background: ${isDanger ? theme.buttonBackgroundDanger : theme.buttonBackground};
  cursor: pointer;
  display: block;
  width: 100%;
  height: ${isDanger ? '40px' : '48px'};
  box-sizing: border-box;
  border: none;
  border-radius: ${theme.borderRadius};
  color: ${theme.buttonTextColor};
  font-size: 15px;
  line-height: 20px;
  padding: 0 1rem;
  position: relative;
  text-align: center;

  &:disabled {
    cursor: default;
  }

  &:not(:disabled):hover {
    background: ${isDanger ? theme.buttonBackgroundDangerHover : theme.buttonBackgroundHover};
  }

  .busyOverlay,
  .disabledOverlay {
    visibility: hidden;
  }

  .disabledOverlay {
    background: rgba(96,96,96,0.75);
    border-radius: ${theme.borderRadius};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  svg {
    margin-right: 0.3rem;
  }

  &.isBusy {
    background: rgba(96,96,96,0.15);

    .children {
      opacity: 0.25;
    }

    .busyOverlay {
      visibility: visible;
    }
  }

  &.isDisabled .disabledOverlay {
    visibility: visible;
  }
`);

exports.default = _default;