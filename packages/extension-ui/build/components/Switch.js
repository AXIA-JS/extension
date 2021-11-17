// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Switch({
  checked,
  checkedLabel,
  className,
  onChange,
  uncheckedLabel
}) {
  const _onChange = useCallback(event => onChange(event.target.checked), [onChange]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("span", {
      children: uncheckedLabel
    }), /*#__PURE__*/_jsxs("label", {
      children: [/*#__PURE__*/_jsx("input", {
        checked: checked,
        className: "checkbox",
        onChange: _onChange,
        type: "checkbox"
      }), /*#__PURE__*/_jsx("span", {
        className: "slider"
      })]
    }), /*#__PURE__*/_jsx("span", {
      children: checkedLabel
    })]
  });
}

export default styled(Switch).withConfig({
  displayName: "Switch",
  componentId: "sc-1qhye2q-0"
})(({
  theme
}) => `
  label {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
    margin: 8px;
  }

  .checkbox {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider:before {
      transform: translateX(24px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.readonlyInputBackground};
    transition: 0.2s;
    border-radius: 100px;
    border: 1px solid ${theme.inputBorderColor};

    &:before {
      position: absolute;
      content: '';
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 3px;
      background-color: ${theme.primaryColor};
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`);