// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Trans } from 'react-i18next';
import { useParams } from 'react-router';
import styled from 'styled-components';
import useTranslation from "../hooks/useTranslation.js";
import { Header } from "../partials/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function PhishingDetected({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    website
  } = useParams();
  const decodedWebsite = decodeURIComponent(website);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      text: t('Phishing detected')
    }), /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [/*#__PURE__*/_jsx("p", {
        children: t('You have been redirected because the AXIA{.js} extension believes that this website could compromise the security of your accounts and your tokens.')
      }), /*#__PURE__*/_jsx("p", {
        className: "websiteAddress",
        children: decodedWebsite
      }), /*#__PURE__*/_jsx("p", {
        children: /*#__PURE__*/_jsxs(Trans, {
          i18nKey: "phishing.incorrect",
          children: ["Note that this  website was reported on a community-driven, curated list. It might be incomplete or inaccurate. If you think that this website was flagged incorrectly, ", /*#__PURE__*/_jsx("a", {
            href: "https://github.com/axia-js/phishing/issues/new",
            children: "please open an issue by clicking here"
          }), "."]
        })
      })]
    })]
  });
}

export default styled(PhishingDetected).withConfig({
  displayName: "PhishingDetected",
  componentId: "sc-1omir55-0"
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