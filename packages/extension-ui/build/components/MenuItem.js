// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function MenuItem({
  children,
  className = '',
  title
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `${className}${title ? ' isTitled' : ''}`,
    children: [title && /*#__PURE__*/_jsx("div", {
      className: "itemTitle",
      children: title
    }), children]
  });
}

export default styled(MenuItem).withConfig({
  displayName: "MenuItem",
  componentId: "sc-xmh0bc-0"
})(({
  theme
}) => `
  min-width: 13rem;
  padding: 0 16px;
  max-width: 100%;

  > .itemTitle {
    margin: 0;
    width: 100%;
    font-size: ${theme.inputLabelFontSize};
    line-height: 14px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${theme.textColor};
    opacity: 0.65;
  }

  &+&.isTitled {
    margin-top: 16px;
  }
`);