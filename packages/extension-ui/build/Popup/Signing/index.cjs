"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Signing;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _index2 = require("../../partials/index.cjs");

var _index3 = _interopRequireDefault(require("./Request/index.cjs"));

var _TransactionIndex = _interopRequireDefault(require("./TransactionIndex.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Signing() {
  var _request$request, _request$request$payl;

  const {
    t
  } = (0, _useTranslation.default)();
  const requests = (0, _react.useContext)(_index.SigningReqContext);
  const [requestIndex, setRequestIndex] = (0, _react.useState)(0);

  const _onNextClick = (0, _react.useCallback)(() => setRequestIndex(requestIndex => requestIndex + 1), []);

  const _onPreviousClick = (0, _react.useCallback)(() => setRequestIndex(requestIndex => requestIndex - 1), []);

  (0, _react.useEffect)(() => {
    setRequestIndex(requestIndex => requestIndex < requests.length ? requestIndex : requests.length - 1);
  }, [requests]); // protect against removal overflows/underflows

  const request = requests.length !== 0 ? requestIndex >= 0 ? requestIndex < requests.length ? requests[requestIndex] : requests[requests.length - 1] : requests[0] : null;
  const isTransaction = !!(request !== null && request !== void 0 && (_request$request = request.request) !== null && _request$request !== void 0 && (_request$request$payl = _request$request.payload) !== null && _request$request$payl !== void 0 && _request$request$payl.blockNumber);
  return request ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Header, {
      text: isTransaction ? t('Transaction') : t('Sign message'),
      children: requests.length > 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_TransactionIndex.default, {
        index: requestIndex,
        onNextClick: _onNextClick,
        onPreviousClick: _onPreviousClick,
        totalItems: requests.length
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {
      account: request.account,
      buttonText: isTransaction ? t('Sign the transaction') : t('Sign the message'),
      isFirst: requestIndex === 0,
      request: request.request,
      signId: request.id,
      url: request.url
    })]
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Loading, {});
}