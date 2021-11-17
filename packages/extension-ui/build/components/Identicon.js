// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Icon from '@axia-js/react-identicon';
import { jsx as _jsx } from "react/jsx-runtime";

function Identicon({
  className,
  iconTheme,
  onCopy,
  prefix,
  value
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(Icon, {
      className: "icon",
      onCopy: onCopy,
      prefix: prefix,
      size: 64,
      theme: iconTheme,
      value: value
    })
  });
}

export default styled(Identicon).withConfig({
  displayName: "Identicon",
  componentId: "sc-1thm8o9-0"
})(({
  theme
}) => `
  background: rgba(192, 192, 292, 0.25);
  border-radius: 50%;
  display: flex;
  justify-content: center;

  .container:before {
    box-shadow: none;
    background: ${theme.identiconBackground};
  }

  svg {
    circle:first-of-type {
      display: none;
    }
  }
`);