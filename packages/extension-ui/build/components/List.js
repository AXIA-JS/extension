// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

const List = ({
  children,
  className
}) => /*#__PURE__*/_jsx("ul", {
  className: className,
  children: children
});

export default styled(List).withConfig({
  displayName: "List",
  componentId: "sc-n8zxx7-0"
})(({
  theme
}) => `
  list-style: none;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  text-indent: -22px;
  margin-left: 21px;

  li {
    margin-bottom: 8px;
  }

  li::before {
    content: '\\2022';
    color: ${theme.primaryColor};
    font-size: 30px;
    font-weight: bold;
    margin-right: 10px;
    vertical-align: -20%;
  }
`);