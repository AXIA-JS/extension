// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Name, Password } from "../partials/index.js";
import { BackButton, ButtonArea, NextStepButton, VerticalSpace } from "./index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function AccountNamePasswordCreation({
  buttonLabel,
  isBusy,
  onBackClick,
  onCreate,
  onNameChange
}) {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const _onCreate = useCallback(() => name && password && onCreate(name, password), [name, password, onCreate]);

  const _onNameChange = useCallback(name => {
    onNameChange(name || '');
    setName(name);
  }, [onNameChange]);

  const _onBackClick = useCallback(() => {
    _onNameChange(null);

    setPassword(null);
    onBackClick();
  }, [_onNameChange, onBackClick]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Name, {
      isFocused: true,
      onChange: _onNameChange
    }), /*#__PURE__*/_jsx(Password, {
      onChange: setPassword
    }), /*#__PURE__*/_jsx(VerticalSpace, {}), /*#__PURE__*/_jsxs(ButtonArea, {
      children: [/*#__PURE__*/_jsx(BackButton, {
        onClick: _onBackClick
      }), /*#__PURE__*/_jsx(NextStepButton, {
        "data-button-action": "add new root",
        isBusy: isBusy,
        isDisabled: !password || !name,
        onClick: _onCreate,
        children: buttonLabel
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(AccountNamePasswordCreation);