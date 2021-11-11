// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { InputWithLabel, Warning } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Unlock({
  className,
  error,
  isBusy,
  onSign,
  password,
  setError,
  setPassword
}) {
  const {
    t
  } = useTranslation();

  const _onChangePassword = useCallback(password => {
    setPassword(password);
    setError(null);
  }, [setError, setPassword]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(InputWithLabel, {
      disabled: isBusy,
      isError: !password || !!error,
      isFocused: true,
      label: t('Password for this account'),
      onChange: _onChangePassword,
      onEnter: onSign,
      type: "password",
      value: password,
      withoutMargin: true
    }), error && /*#__PURE__*/_jsx(Warning, {
      isBelowInput: true,
      isDanger: true,
      children: error
    })]
  });
}

export default /*#__PURE__*/React.memo(Unlock);