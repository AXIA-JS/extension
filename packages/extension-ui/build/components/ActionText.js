// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ActionText({
  className,
  icon,
  onClick,
  text
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    onClick: onClick,
    children: [icon && /*#__PURE__*/_jsx(FontAwesomeIcon, {
      icon: icon
    }), /*#__PURE__*/_jsx("span", {
      children: text
    })]
  });
}

export default styled(ActionText).withConfig({
  displayName: "ActionText",
  componentId: "sc-1rh9904-0"
})(({
  theme
}) => `
  cursor: pointer;

  span {
    color: ${theme.labelColor}
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    text-decoration-line: underline;
  }

  .svg-inline--fa {
    color: ${theme.iconNeutralColor};
    display: inline-block;
    margin-right: 0.3rem;
    position: relative;
    top: 2px;
  }
`);