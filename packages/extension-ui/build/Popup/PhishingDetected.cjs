"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _reactRouter = require("react-router");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _index = require("../partials/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function PhishingDetected({
  className
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const {
    website
  } = (0, _reactRouter.useParams)();
  const decodedWebsite = decodeURIComponent(website);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Header, {
      text: t('Phishing detected')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('You have been redirected because the AXIACoin{.js} extension believes that this website could compromise the security of your accounts and your tokens.')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "websiteAddress",
        children: decodedWebsite
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactI18next.Trans, {
          i18nKey: "phishing.incorrect",
          children: ["Note that this  website was reported on a community-driven, curated list. It might be incomplete or inaccurate. If you think that this website was flagged incorrectly, ", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            href: "https://github.com/axia-js/phishing/issues/new",
            children: "please open an issue by clicking here"
          }), "."]
        })
      })]
    })]
  });
}

var _default = (0, _styledComponents.default)(PhishingDetected).withConfig({
  displayName: "PhishingDetected",
  componentId: "sc-16kfpjk-0"
})(({
  theme
}) => `
  p {
    color: ${theme.subTextColor};
    margin-bottom: 1rem;
    margin-top: 0;

    a {
      color: ${theme.subTextColor};
    }

    &.websiteAddress {
      font-size: 1.3rem;
      text-align: center;
    }
  }
`);

exports.default = _default;