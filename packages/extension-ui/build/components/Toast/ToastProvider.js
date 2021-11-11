// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { ToastContext } from "../index.js";
import Toast from "./Toast.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const TOAST_TIMEOUT = 1500;

const ToastProvider = ({
  children
}) => {
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  const show = useCallback(message => {
    const timerId = setTimeout(() => setVisible(false), TOAST_TIMEOUT);
    setContent(message);
    setVisible(true);
    return () => clearTimeout(timerId);
  }, []);
  return /*#__PURE__*/_jsxs(ToastContext.Provider, {
    value: {
      show
    },
    children: [children, /*#__PURE__*/_jsx(Toast, {
      content: content,
      visible: visible
    })]
  });
};

export default ToastProvider;
ToastProvider.displayName = 'Toast';