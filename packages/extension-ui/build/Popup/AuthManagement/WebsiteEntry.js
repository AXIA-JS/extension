// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Switch } from '@axia-js/extension-ui/components';
import useTranslation from "../../hooks/useTranslation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function WebsiteEntry({
  className = '',
  info,
  toggleAuth,
  url
}) {
  const {
    t
  } = useTranslation();
  const switchAccess = useCallback(() => {
    toggleAuth(url);
  }, [toggleAuth, url]);
  return /*#__PURE__*/_jsxs("div", {
    className: `${className} ${info.isAllowed ? 'allowed' : 'denied'}`,
    children: [/*#__PURE__*/_jsx("div", {
      className: "url",
      children: url
    }), /*#__PURE__*/_jsx(Switch, {
      checked: info.isAllowed,
      checkedLabel: t('allowed'),
      className: "info",
      onChange: switchAccess,
      uncheckedLabel: t('denied')
    })]
  });
}

export default styled(WebsiteEntry).withConfig({
  displayName: "WebsiteEntry",
  componentId: "sc-yjvywb-0"
})(({
  theme
}) => `
  display: flex;
  align-items: center;

  .url{
    flex: 1;
  }

  &.denied {
    .slider::before {
        background-color: ${theme.backButtonBackground};
      }
  }
`);