// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Loading, SigningReqContext } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { Header } from "../../partials/index.js";
import Request from "./Request/index.js";
import TransactionIndex from "./TransactionIndex.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Signing() {
  var _request$request, _request$request$payl;

  const {
    t
  } = useTranslation();
  const requests = useContext(SigningReqContext);
  const [requestIndex, setRequestIndex] = useState(0);

  const _onNextClick = useCallback(() => setRequestIndex(requestIndex => requestIndex + 1), []);

  const _onPreviousClick = useCallback(() => setRequestIndex(requestIndex => requestIndex - 1), []);

  useEffect(() => {
    setRequestIndex(requestIndex => requestIndex < requests.length ? requestIndex : requests.length - 1);
  }, [requests]); // protect against removal overflows/underflows

  const request = requests.length !== 0 ? requestIndex >= 0 ? requestIndex < requests.length ? requests[requestIndex] : requests[requests.length - 1] : requests[0] : null;
  const isTransaction = !!(request !== null && request !== void 0 && (_request$request = request.request) !== null && _request$request !== void 0 && (_request$request$payl = _request$request.payload) !== null && _request$request$payl !== void 0 && _request$request$payl.blockNumber);
  return request ? /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      text: isTransaction ? t('Transaction') : t('Sign message'),
      children: requests.length > 1 && /*#__PURE__*/_jsx(TransactionIndex, {
        index: requestIndex,
        onNextClick: _onNextClick,
        onPreviousClick: _onPreviousClick,
        totalItems: requests.length
      })
    }), /*#__PURE__*/_jsx(Request, {
      account: request.account,
      buttonText: isTransaction ? t('Sign the transaction') : t('Sign the message'),
      isFirst: requestIndex === 0,
      request: request.request,
      signId: request.id,
      url: request.url
    })]
  }) : /*#__PURE__*/_jsx(Loading, {});
}