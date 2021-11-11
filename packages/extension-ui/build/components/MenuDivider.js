// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function MenuDivider({
  className
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className
  });
}

export default styled(MenuDivider).withConfig({
  displayName: "MenuDivider",
  componentId: "sc-1nxqa93-0"
})(({
  theme
}) => `
  padding-top: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${theme.inputBorderColor};
`);