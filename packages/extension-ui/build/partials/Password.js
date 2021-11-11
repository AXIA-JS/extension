// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { InputWithLabel, ValidatedInput } from "../components/index.js";
import useTranslation from "../hooks/useTranslation.js";
import { allOf, isNotShorterThan, isSameAs } from "../util/validators.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MIN_LENGTH = 6;
export default function Password({
  isFocussed,
  onChange
}) {
  const {
    t
  } = useTranslation();
  const [pass1, setPass1] = useState(null);
  const [pass2, setPass2] = useState(null);
  const isFirstPasswordValid = useMemo(() => isNotShorterThan(MIN_LENGTH, t('Password is too short')), [t]);
  const isSecondPasswordValid = useCallback(firstPassword => allOf(isNotShorterThan(MIN_LENGTH, t('Password is too short')), isSameAs(firstPassword, t('Passwords do not match'))), [t]);
  useEffect(() => {
    onChange(pass1 && pass2 ? pass1 : null);
  }, [onChange, pass1, pass2]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ValidatedInput, {
      component: InputWithLabel,
      "data-input-password": true,
      isFocused: isFocussed,
      label: t('A new password for this account'),
      onValidatedChange: setPass1,
      type: "password",
      validator: isFirstPasswordValid
    }), pass1 && /*#__PURE__*/_jsx(ValidatedInput, {
      component: InputWithLabel,
      "data-input-repeat-password": true,
      label: t('Repeat password for verification'),
      onValidatedChange: setPass2,
      type: "password",
      validator: isSecondPasswordValid(pass1)
    })]
  });
}