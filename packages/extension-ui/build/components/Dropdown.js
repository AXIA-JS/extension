// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import arrow from "../assets/arrow-down.svg";
import Label from "./Label.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Dropdown({
  className,
  defaultValue,
  isDisabled,
  isFocussed,
  label,
  onBlur,
  onChange,
  options,
  value
}) {
  const _onChange = useCallback(({
    target: {
      value
    }
  }) => onChange && onChange(value.trim()), [onChange]);

  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx(Label, {
      className: className,
      label: label,
      children: /*#__PURE__*/_jsx("select", {
        autoFocus: isFocussed,
        defaultValue: defaultValue || undefined,
        disabled: isDisabled,
        onBlur: onBlur,
        onChange: _onChange,
        value: value,
        children: options.map(({
          text,
          value
        }) => /*#__PURE__*/_jsx("option", {
          value: value,
          children: text
        }, value))
      })
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Dropdown).withConfig({
  displayName: "Dropdown",
  componentId: "sc-13l7z1t-0"
})(({
  isError,
  label,
  theme
}) => `
  position: relative;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: ${theme.readonlyInputBackground};
    border-color: ${isError ? theme.errorBorderColor : theme.inputBorderColor};
    border-radius: ${theme.borderRadius};
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: ${isError ? theme.errorBorderColor : theme.textColor};
    display: block;
    font-family: ${theme.fontFamily};
    font-size: ${theme.fontSize};
    padding: 0.5rem 0.75rem;
    width: 100%;
    cursor: pointer;

    &:read-only {
      box-shadow: none;
      outline: none;
    }
  }

  label::after {
    content: '';
    position: absolute;
    top: ${label ? 'calc(50% + 14px)' : '50%'};
    transform: translateY(-50%);
    right: 12px;
    width: 8px;
    height: 6px;
    background: url(${arrow}) center no-repeat;
    pointer-events: none;
  }
`));