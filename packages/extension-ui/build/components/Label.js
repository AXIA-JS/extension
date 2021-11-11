// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Label({
  children,
  className,
  label
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("label", {
      children: label
    }), children]
  });
}

export default styled(Label).withConfig({
  displayName: "Label",
  componentId: "sc-vfik0m-0"
})(({
  theme
}) => `
  color: ${theme.textColor};

  label {
    font-size: ${theme.inputLabelFontSize};
    line-height: 14px;
    letter-spacing: 0.04em;
    opacity: 0.65;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
`);