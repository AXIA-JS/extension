// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useMemo } from 'react';
import { AccountContext, InputWithLabel, ValidatedInput } from "../components/index.js";
import useTranslation from "../hooks/useTranslation.js";
import { isNotShorterThan } from "../util/validators.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function Name({
  address,
  className,
  isFocused,
  label,
  onBlur,
  onChange,
  value
}) {
  const {
    t
  } = useTranslation();
  const {
    accounts
  } = useContext(AccountContext);
  const isNameValid = useMemo(() => isNotShorterThan(3, t('Account name is too short')), [t]);
  const account = accounts.find(account => account.address === address);
  const startValue = value || (account === null || account === void 0 ? void 0 : account.name);
  return /*#__PURE__*/_jsx(ValidatedInput, {
    className: className,
    component: InputWithLabel,
    "data-input-name": true,
    defaultValue: startValue,
    isFocused: isFocused,
    label: label || t('A descriptive name for your account'),
    onBlur: onBlur,
    onEnter: onBlur,
    onValidatedChange: onChange,
    type: "text",
    validator: isNameValid
  });
}