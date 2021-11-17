// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Checkmark from "../assets/checkmark.svg";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Checkbox({
  checked,
  className,
  label,
  onChange,
  onClick
}) {
  const _onChange = useCallback(event => onChange && onChange(event.target.checked), [onChange]);

  const _onClick = useCallback(() => onClick && onClick(), [onClick]);

  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsxs("label", {
      children: [label, /*#__PURE__*/_jsx("input", {
        checked: checked,
        onChange: _onChange,
        onClick: _onClick,
        type: "checkbox"
      }), /*#__PURE__*/_jsx("span", {})]
    })
  });
}

export default styled(Checkbox).withConfig({
  displayName: "Checkbox",
  componentId: "sc-1n3sp7g-0"
})(({
  theme
}) => `
  margin: ${theme.boxMargin};

  label {
    display: block;
    position: relative;
    cursor: pointer;
    user-select: none;
    padding-left: 24px;
    padding-top: 1px;
    color: ${theme.subTextColor};
    font-size: ${theme.fontSize};
    line-height: ${theme.lineHeight};

    & input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    & span {
      position: absolute;
      top: 4px;
      left: 0;
      height: 16px;
      width: 16px;
      border-radius: ${theme.borderRadius};
      background-color: ${theme.readonlyInputBackground};
      border: 1px solid ${theme.inputBorderColor};
      border: 1px solid ${theme.inputBorderColor};
      &:after {
        content: '';
        display: none;
        width: 13px;
        height: 10px;
        position: absolute;
        left: 1px;
        top: 2px;
        mask: url(${Checkmark});
        mask-size: cover;
        background: ${theme.primaryColor};
      }
    }

    &:hover input ~ span {
      background-color: ${theme.inputBackground};
    }

    input:checked ~ span:after {
      display: block;
    }
  }
`);