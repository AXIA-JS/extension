// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import "./i18n/i18n.js";
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { View } from "./components/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function createView(Entry, rootId = 'root') {
  const rootElement = document.getElementById(rootId);

  if (!rootElement) {
    throw new Error(`Unable to find element with id '${rootId}'`);
  }

  ReactDOM.render( /*#__PURE__*/_jsx(Suspense, {
    fallback: "...",
    children: /*#__PURE__*/_jsx(View, {
      children: /*#__PURE__*/_jsx(HashRouter, {
        children: /*#__PURE__*/_jsx(Entry, {})
      })
    })
  }), rootElement);
}