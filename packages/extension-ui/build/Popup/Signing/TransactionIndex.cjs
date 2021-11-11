"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function TransactionIndex({
  className,
  index,
  onNextClick,
  onPreviousClick,
  totalItems
}) {
  const previousClickActive = index !== 0;
  const nextClickActive = index < totalItems - 1;
  const prevClick = (0, _react.useCallback)(() => {
    previousClickActive && onPreviousClick();
  }, [onPreviousClick, previousClickActive]);
  const nextClick = (0, _react.useCallback)(() => {
    nextClickActive && onNextClick();
  }, [nextClickActive, onNextClick]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "currentStep",
        children: index + 1
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "totalSteps",
        children: ["/", totalItems]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        className: `arrowLeft ${previousClickActive ? 'active' : ''}`,
        icon: _freeSolidSvgIcons.faArrowLeft,
        onClick: prevClick,
        size: "sm"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        className: `arrowRight ${nextClickActive ? 'active' : ''}`,
        icon: _freeSolidSvgIcons.faArrowRight,
        onClick: nextClick,
        size: "sm"
      })]
    })]
  });
}

var _default = (0, _styledComponents.default)(TransactionIndex).withConfig({
  displayName: "TransactionIndex",
  componentId: "sc-5vu9na-0"
})(({
  theme
}) => `
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  padding-right: 24px;

  .arrowLeft, .arrowRight {
    display: inline-block;
    color: ${theme.iconNeutralColor};

    &.active {
      color: ${theme.primaryColor};
      cursor: pointer;
    }
  }

  .arrowRight {
    margin-left: 0.5rem;
  }

  .currentStep {
    color: ${theme.primaryColor};
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    margin-left: 10px;
  }

  .totalSteps {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.textColor};
  }
`);

exports.default = _default;