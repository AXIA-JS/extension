// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import useTranslation from "../hooks/useTranslation.js";
import Label from "./Label.js";
import { Input } from "./TextInputs.js";
import Warning from "./Warning.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function InputWithLabel({
  className,
  defaultValue,
  disabled,
  isError,
  isFocused,
  isReadOnly,
  label = '',
  onBlur,
  onChange,
  onEnter,
  placeholder,
  type = 'text',
  value,
  withoutMargin
}) {
  const [isCapsLock, setIsCapsLock] = useState(false);
  const {
    t
  } = useTranslation();

  const _checkKey = useCallback(event => {
    onEnter && event.key === 'Enter' && onEnter();

    if (type === 'password') {
      if (event.getModifierState('CapsLock')) {
        setIsCapsLock(true);
      } else {
        setIsCapsLock(false);
      }
    }
  }, [onEnter, type]);

  const _onChange = useCallback(({
    target: {
      value
    }
  }) => {
    onChange && onChange(value);
  }, [onChange]);

  return /*#__PURE__*/_jsxs(Label, {
    className: `${className || ''} ${withoutMargin ? 'withoutMargin' : ''}`,
    label: label,
    children: [/*#__PURE__*/_jsx(Input, {
      autoCapitalize: "off",
      autoCorrect: "off",
      autoFocus: isFocused,
      defaultValue: defaultValue || undefined,
      disabled: disabled,
      onBlur: onBlur,
      onChange: _onChange,
      onKeyPress: _checkKey,
      placeholder: placeholder,
      readOnly: isReadOnly,
      spellCheck: false,
      type: type,
      value: value,
      withError: isError
    }), isCapsLock && /*#__PURE__*/_jsx(Warning, {
      isBelowInput: true,
      children: t('Warning: Caps lock is on')
    })]
  });
}

export default styled(InputWithLabel).withConfig({
  displayName: "InputWithLabel",
  componentId: "sc-1r7pvk8-0"
})(["margin-bottom:16px;&.withoutMargin{margin-bottom:0px;+ .danger{margin-top:6px;}}"]);