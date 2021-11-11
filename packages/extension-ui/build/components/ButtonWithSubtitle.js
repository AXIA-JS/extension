// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Button } from "./index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ButtonWithSubtitle({
  children,
  subTitle,
  title,
  to
}) {
  return /*#__PURE__*/_jsxs(StyledButton, {
    to: to,
    children: [/*#__PURE__*/_jsx("p", {
      children: title
    }), /*#__PURE__*/_jsx("span", {
      children: subTitle
    }), children]
  });
}
const StyledButton = styled(Button).withConfig({
  displayName: "ButtonWithSubtitle__StyledButton",
  componentId: "sc-xuq8q1-0"
})(["button{padding-top:0;padding-bottom:0;}p{margin:0;font-size:15px;line-height:20px;}span{display:block;font-size:12px;line-height:16px;}"]);