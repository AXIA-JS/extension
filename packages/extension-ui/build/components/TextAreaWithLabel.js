// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import Label from "./Label.js";
import { TextArea } from "./TextInputs.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function TextAreaWithLabel({
  className,
  isError,
  isFocused,
  isReadOnly,
  label,
  onChange,
  rowsCount,
  value
}) {
  const _onChange = useCallback(({
    target: {
      value
    }
  }) => {
    onChange && onChange(value);
  }, [onChange]);

  return /*#__PURE__*/_jsx(Label, {
    className: className,
    label: label,
    children: /*#__PURE__*/_jsx(TextArea, {
      autoCapitalize: "off",
      autoCorrect: "off",
      autoFocus: isFocused,
      onChange: _onChange,
      readOnly: isReadOnly,
      rows: rowsCount || 2,
      spellCheck: false,
      value: value,
      withError: isError
    })
  });
}