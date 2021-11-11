"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../components/index.cjs");

var _Header = _interopRequireDefault(require("./Header.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function HeaderWithSteps({
  className,
  step,
  text
}) {
  const onAction = (0, _react.useContext)(_index.ActionContext);

  const _onCancel = (0, _react.useCallback)(() => {
    onAction('/');
  }, [onAction]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
    className: className,
    text: text,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "steps",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "current",
          children: step
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "total",
          children: "/2"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionText, {
        onClick: _onCancel,
        text: "Cancel"
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(HeaderWithSteps).withConfig({
  displayName: "HeaderWithSteps",
  componentId: "sc-1hqpy9p-0"
})(({
  theme
}) => `
  .current {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.primaryColor};
  }

  .steps {
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    padding-left: 1em;
    padding-right: 24px;
    margin-top: 3px;
  }

  .total {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.textColor};
  }
`));

exports.default = _default;