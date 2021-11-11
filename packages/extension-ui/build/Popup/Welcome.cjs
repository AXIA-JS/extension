"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _index2 = require("../partials/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const Welcome = function ({
  className
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const onAction = (0, _react.useContext)(_index.ActionContext);

  const _onClick = (0, _react.useCallback)(() => {
    window.localStorage.setItem('welcome_read', 'ok');
    onAction();
  }, [onAction]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Header, {
      text: t('Welcome')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('Before we start, just a couple of notes regarding use:')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Box, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.List, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('We do not send any clicks, pageviews or events to a central server')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('We do not use any trackers or analytics')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t("We don't collect keys, addresses or any information - your information never leaves this machine")
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('... we are not in the information collection business (even anonymized).')
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.VerticalSpace, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ButtonArea, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
        onClick: _onClick,
        children: t('Understood, let me continue')
      })
    })]
  });
};

var _default = (0, _styledComponents.default)(Welcome).withConfig({
  displayName: "Welcome",
  componentId: "sc-17dy7tn-0"
})(({
  theme
}) => `
  p {
    color: ${theme.subTextColor};
    margin-bottom: 6px;
    margin-top: 0;
  }
`);

exports.default = _default;