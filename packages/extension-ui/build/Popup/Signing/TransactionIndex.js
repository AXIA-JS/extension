// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function TransactionIndex({
  className,
  index,
  onNextClick,
  onPreviousClick,
  totalItems
}) {
  const previousClickActive = index !== 0;
  const nextClickActive = index < totalItems - 1;
  const prevClick = useCallback(() => {
    previousClickActive && onPreviousClick();
  }, [onPreviousClick, previousClickActive]);
  const nextClick = useCallback(() => {
    nextClickActive && onNextClick();
  }, [nextClickActive, onNextClick]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("span", {
        className: "currentStep",
        children: index + 1
      }), /*#__PURE__*/_jsxs("span", {
        className: "totalSteps",
        children: ["/", totalItems]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
        className: `arrowLeft ${previousClickActive ? 'active' : ''}`,
        icon: faArrowLeft,
        onClick: prevClick,
        size: "sm"
      }), /*#__PURE__*/_jsx(FontAwesomeIcon, {
        className: `arrowRight ${nextClickActive ? 'active' : ''}`,
        icon: faArrowRight,
        onClick: nextClick,
        size: "sm"
      })]
    })]
  });
}

export default styled(TransactionIndex).withConfig({
  displayName: "TransactionIndex",
  componentId: "sc-xxgxtm-0"
})(({
  theme
}) => `
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  padding-right: 24px;

  .arrowLeft, .arrowRight {
    display: inline-block;
    color: ${theme.iconNeutralColor};

    &.active {
      color: ${theme.primaryColor};
      cursor: pointer;
    }
  }

  .arrowRight {
    margin-left: 0.5rem;
  }

  .currentStep {
    color: ${theme.primaryColor};
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    margin-left: 10px;
  }

  .totalSteps {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.textColor};
  }
`);