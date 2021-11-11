// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import useTranslation from "../hooks/useTranslation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function Loading({
  children
}) {
  const {
    t
  } = useTranslation();

  if (!children) {
    return /*#__PURE__*/_jsx("div", {
      children: t('... loading ...')
    });
  }

  return /*#__PURE__*/_jsx(_Fragment, {
    children: children
  });
}