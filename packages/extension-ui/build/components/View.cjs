"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _index = require("./index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// FIXME We should not import from index when this one is imported there as well
function View({
  children,
  className
}) {
  const [theme, setTheme] = (0, _react.useState)((0, _index.chooseTheme)());
  const switchTheme = (0, _react.useCallback)(theme => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }, []);
  const _theme = _index.themes[theme];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ThemeSwitchContext.Provider, {
    value: switchTheme,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styledComponents.ThemeProvider, {
      theme: _theme,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BodyTheme, {
        theme: _theme
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Main, {
        className: className,
        children: children
      })]
    })
  });
}

const BodyTheme = (0, _styledComponents.createGlobalStyle)(["body{background-color:", ";}html{scrollbar-width:none;&::-webkit-scrollbar{display:none;}}"], ({
  theme
}) => theme.bodyColor);
var _default = View;
exports.default = _default;