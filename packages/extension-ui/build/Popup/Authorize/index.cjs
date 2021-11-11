"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _index2 = require("../../partials/index.cjs");

var _Request = _interopRequireDefault(require("./Request.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Authorize({
  className = ''
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const requests = (0, _react.useContext)(_index.AuthorizeReqContext);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `${className} ${requests.length === 1 ? 'lastRequest' : ''}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Header, {
        text: t('Authorize')
      }), requests.map(({
        id,
        request,
        url
      }, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Request.default, {
        authId: id,
        className: "request",
        isFirst: index === 0,
        request: request,
        url: url
      }, id))]
    })
  });
}

var _default = (0, _styledComponents.default)(Authorize).withConfig({
  displayName: "Authorize",
  componentId: "sc-42r4rf-0"
})(["overflow-y:auto;&.lastRequest{overflow:hidden;}&&{padding:0;}.request{padding:0 24px;}"]);

exports.default = _default;