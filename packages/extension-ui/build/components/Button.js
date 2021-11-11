// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Spinner from "./Spinner.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Button({
  children,
  className = '',
  isBusy,
  isDisabled,
  onClick,
  to
}) {
  const _onClick = useCallback(() => {
    if (isBusy || isDisabled) {
      return;
    }

    onClick && onClick();

    if (to) {
      window.location.hash = to;
    }
  }, [isBusy, isDisabled, onClick, to]);

  return /*#__PURE__*/_jsxs("button", {
    className: `${className}${isDisabled || isBusy ? ' isDisabled' : ''}${isBusy ? ' isBusy' : ''}`,
    disabled: isDisabled || isBusy,
    onClick: _onClick,
    children: [/*#__PURE__*/_jsx("div", {
      className: "children",
      children: children
    }), /*#__PURE__*/_jsx("div", {
      className: "disabledOverlay"
    }), /*#__PURE__*/_jsx(Spinner, {
      className: "busyOverlay"
    })]
  });
}

export default styled(Button).withConfig({
  displayName: "Button",
  componentId: "sc-1hhf3ka-0"
})(({
  isDanger,
  theme
}) => `
  background: ${isDanger ? theme.buttonBackgroundDanger : theme.buttonBackground};
  cursor: pointer;
  display: block;
  width: 100%;
  height: ${isDanger ? '40px' : '48px'};
  box-sizing: border-box;
  border: none;
  border-radius: ${theme.borderRadius};
  color: ${theme.buttonTextColor};
  font-size: 15px;
  line-height: 20px;
  padding: 0 1rem;
  position: relative;
  text-align: center;

  &:disabled {
    cursor: default;
  }

  &:not(:disabled):hover {
    background: ${isDanger ? theme.buttonBackgroundDangerHover : theme.buttonBackgroundHover};
  }

  .busyOverlay,
  .disabledOverlay {
    visibility: hidden;
  }

  .disabledOverlay {
    background: rgba(96,96,96,0.75);
    border-radius: ${theme.borderRadius};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  svg {
    margin-right: 0.3rem;
  }

  &.isBusy {
    background: rgba(96,96,96,0.15);

    .children {
      opacity: 0.25;
    }

    .busyOverlay {
      visibility: visible;
    }
  }

  &.isDisabled .disabledOverlay {
    visibility: visible;
  }
`);