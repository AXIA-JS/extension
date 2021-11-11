// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import { Loading, MetadataReqContext } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { Header } from "../../partials/index.js";
import Request from "./Request.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Metadata() {
  const {
    t
  } = useTranslation();
  const requests = useContext(MetadataReqContext);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      text: t('Metadata')
    }), requests[0] ? /*#__PURE__*/_jsx(Request, {
      metaId: requests[0].id,
      request: requests[0].request,
      url: requests[0].url
    }, requests[0].id) : /*#__PURE__*/_jsx(Loading, {})]
  });
}