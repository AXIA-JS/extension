// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

const ButtonArea = function ({
  children,
  className
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: children
  });
};

export default styled(ButtonArea).withConfig({
  displayName: "ButtonArea",
  componentId: "sc-iqj4e0-0"
})(({
  theme
}) => `
  display: flex;
  flex-direction: row;
  background: ${theme.highlightedAreaBackground};
  border-top: 1px solid ${theme.inputBorderColor};
  padding: 12px 24px;
  margin-left: 0;
  margin-right: 0;

  & > button:not(:last-of-type) {
    margin-right: 8px;
  }
`);