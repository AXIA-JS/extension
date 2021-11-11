// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Box({
  banner,
  children,
  className
}) {
  return /*#__PURE__*/_jsxs("article", {
    className: className,
    children: [children, banner && /*#__PURE__*/_jsx("div", {
      className: "banner",
      children: banner
    })]
  });
}

export default styled(Box).withConfig({
  displayName: "Box",
  componentId: "sc-umuyf1-0"
})(({
  theme
}) => `
  background: ${theme.readonlyInputBackground};
  border: 1px solid ${theme.inputBorderColor};
  border-radius: ${theme.borderRadius};
  color: ${theme.subTextColor};
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};
  margin: 0.75rem 24px;
  padding: ${theme.boxPadding};
  position: relative;

  .banner {
    background: darkorange;
    border-radius: 0 ${theme.borderRadius} 0 ${theme.borderRadius};
    color: white;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    position: absolute;
    right: 0;
    top: 0;
  }
`);