// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components'; // FIXME We should not import from index when this one is imported there as well

import { chooseTheme, Main, themes, ThemeSwitchContext } from "./index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function View({
  children,
  className
}) {
  const [theme, setTheme] = useState(chooseTheme());
  const switchTheme = useCallback(theme => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }, []);
  const _theme = themes[theme];
  return /*#__PURE__*/_jsx(ThemeSwitchContext.Provider, {
    value: switchTheme,
    children: /*#__PURE__*/_jsxs(ThemeProvider, {
      theme: _theme,
      children: [/*#__PURE__*/_jsx(BodyTheme, {
        theme: _theme
      }), /*#__PURE__*/_jsx(Main, {
        className: className,
        children: children
      })]
    })
  });
}

const BodyTheme = createGlobalStyle(["body{background-color:", ";}html{scrollbar-width:none;&::-webkit-scrollbar{display:none;}}"], ({
  theme
}) => theme.bodyColor);
export default View;