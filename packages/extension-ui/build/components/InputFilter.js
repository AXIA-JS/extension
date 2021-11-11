// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Input } from "./TextInputs.js";
import { jsx as _jsx } from "react/jsx-runtime";

function InputFilter({
  className,
  onChange,
  placeholder,
  value
}) {
  const onChangeFilter = useCallback(event => {
    onChange(event.target.value);
  }, [onChange]);
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(Input, {
      autoCapitalize: "off",
      autoCorrect: "off",
      autoFocus: true,
      onChange: onChangeFilter,
      placeholder: placeholder,
      spellCheck: false,
      type: "text",
      value: value
    })
  });
}

export default styled(InputFilter).withConfig({
  displayName: "InputFilter",
  componentId: "sc-tsuuiq-0"
})(["padding-left:1rem !important;padding-right:1rem !important;"]);