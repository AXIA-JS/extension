// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Menu({
  children,
  className,
  reference
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    ref: reference,
    children: children
  });
}

export default styled(Menu).withConfig({
  displayName: "Menu",
  componentId: "sc-rntca8-0"
})(({
  theme
}) => `
  background: ${theme.popupBackground};
  border-radius: 4px;
  border: 1px solid ${theme.boxBorderColor};
  box-sizing: border-box;
  box-shadow: 0 0 10px ${theme.boxShadow};
  margin-top: 60px;
  padding: 16px 0;
  position: absolute;
  right: 0;
  z-index: 2;
`);