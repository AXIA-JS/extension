// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Main({
  children,
  className
}) {
  return /*#__PURE__*/_jsx("main", {
    className: className,
    children: children
  });
}

export default styled(Main).withConfig({
  displayName: "Main",
  componentId: "sc-lx1lhb-0"
})(({
  theme
}) => `
  display: flex;
  flex-direction: column;
  height: calc(100vh - 2px);
  background: ${theme.background};
  color: ${theme.textColor};
  font-size: ${theme.fontSize};
  line-height: ${theme.lineHeight};
  border: 1px solid ${theme.inputBorderColor};

  * {
    font-family: ${theme.fontFamily};
  }

  > * {
    padding-left: 24px;
    padding-right: 24px;
  }
`);