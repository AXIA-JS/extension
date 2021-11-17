// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthorizeReqContext } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { Header } from "../../partials/index.js";
import Request from "./Request.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Authorize({
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const requests = useContext(AuthorizeReqContext);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs("div", {
      className: `${className} ${requests.length === 1 ? 'lastRequest' : ''}`,
      children: [/*#__PURE__*/_jsx(Header, {
        text: t('Authorize')
      }), requests.map(({
        id,
        request,
        url
      }, index) => /*#__PURE__*/_jsx(Request, {
        authId: id,
        className: "request",
        isFirst: index === 0,
        request: request,
        url: url
      }, id))]
    })
  });
}

export default styled(Authorize).withConfig({
  displayName: "Authorize",
  componentId: "sc-1rg92xy-0"
})(["overflow-y:auto;&.lastRequest{overflow:hidden;}&&{padding:0;}.request{padding:0 24px;}"]);