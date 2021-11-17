// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { ActionContext, ActionText } from "../components/index.js";
import Header from "./Header.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function HeaderWithSteps({
  className,
  step,
  text
}) {
  const onAction = useContext(ActionContext);

  const _onCancel = useCallback(() => {
    onAction('/');
  }, [onAction]);

  return /*#__PURE__*/_jsx(Header, {
    className: className,
    text: text,
    children: /*#__PURE__*/_jsxs("div", {
      className: "steps",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("span", {
          className: "current",
          children: step
        }), /*#__PURE__*/_jsx("span", {
          className: "total",
          children: "/2"
        })]
      }), /*#__PURE__*/_jsx(ActionText, {
        onClick: _onCancel,
        text: "Cancel"
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(HeaderWithSteps).withConfig({
  displayName: "HeaderWithSteps",
  componentId: "sc-1tida15-0"
})(({
  theme
}) => `
  .current {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.primaryColor};
  }

  .steps {
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    padding-left: 1em;
    padding-right: 24px;
    margin-top: 3px;
  }

  .total {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.textColor};
  }
`));