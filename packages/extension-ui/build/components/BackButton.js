// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import Button from "./Button.js";
import { jsx as _jsx } from "react/jsx-runtime";

function BackButton({
  className,
  onClick
}) {
  return /*#__PURE__*/_jsx(Button, {
    className: className,
    onClick: onClick,
    children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
      className: "arrowLeft",
      icon: faArrowLeft,
      size: "sm"
    })
  });
}

export default styled(BackButton).withConfig({
  displayName: "BackButton",
  componentId: "sc-nyj14m-0"
})(({
  theme
}) => `
  background: ${theme.backButtonBackground};
  margin-right: 11px;
  width: 42px;

  .arrowLeft {
    color: ${theme.backButtonTextColor};
    display: block;
    margin: auto;
  }

  &:not(:disabled):hover {
    background: ${theme.backButtonBackgroundHover};
  }
`);