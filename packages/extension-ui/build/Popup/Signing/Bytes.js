// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import useTranslation from "../../hooks/useTranslation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Bytes({
  bytes,
  className,
  url
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsx("table", {
    className: className,
    children: /*#__PURE__*/_jsxs("tbody", {
      children: [/*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          className: "label",
          children: t('from')
        }), /*#__PURE__*/_jsx("td", {
          className: "data",
          children: url
        })]
      }), /*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          className: "label",
          children: t('bytes')
        }), /*#__PURE__*/_jsx("td", {
          className: "data",
          children: bytes
        })]
      })]
    })
  });
}

export default styled(Bytes).withConfig({
  displayName: "Bytes",
  componentId: "sc-1smo6lz-0"
})(["border:0;display:block;font-size:0.75rem;margin-top:0.75rem;td.data{max-width:0;overflow:hidden;text-align:left;text-overflow:ellipsis;vertical-align:middle;width:100%;pre{font-family:inherit;font-size:0.75rem;margin:0;}}td.label{opacity:0.5;padding:0 0.5rem;text-align:right;vertical-align:middle;white-space:nowrap;}"]);