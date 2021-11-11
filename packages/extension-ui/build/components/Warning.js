// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Warning({
  children,
  className = '',
  isBelowInput,
  isDanger
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `${className} ${isDanger ? 'danger' : ''} ${isBelowInput ? 'belowInput' : ''}`,
    children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
      className: "warningImage",
      icon: faExclamationTriangle
    }), /*#__PURE__*/_jsx("div", {
      className: "warning-message",
      children: children
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Warning).withConfig({
  displayName: "Warning",
  componentId: "sc-1u3drz1-0"
})(({
  isDanger,
  theme
}) => `
  display: flex;
  flex-direction: row;
  padding-left: 18px;
  color: ${theme.subTextColor};
  margin-right: 20px;
  margin-top: 6px;
  border-left: ${`0.25rem solid ${theme.iconWarningColor}`};

  &.belowInput {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};

    &.danger {
      margin-top: -10px;
    }
  }

  &.danger {
    border-left-color: ${theme.buttonBackgroundDanger};
  }

  .warning-message {
    display: flex;
    align-items: center;
  }

  .warningImage {
    margin: 5px 10px 5px 0;
    color: ${isDanger ? theme.iconDangerColor : theme.iconWarningColor};
  }
`));