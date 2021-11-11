// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { ActionContext, Box, Button, ButtonArea, List, VerticalSpace } from "../components/index.js";
import useTranslation from "../hooks/useTranslation.js";
import { Header } from "../partials/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const Welcome = function ({
  className
}) {
  const {
    t
  } = useTranslation();
  const onAction = useContext(ActionContext);

  const _onClick = useCallback(() => {
    window.localStorage.setItem('welcome_read', 'ok');
    onAction();
  }, [onAction]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      text: t('Welcome')
    }), /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [/*#__PURE__*/_jsx("p", {
        children: t('Before we start, just a couple of notes regarding use:')
      }), /*#__PURE__*/_jsx(Box, {
        children: /*#__PURE__*/_jsxs(List, {
          children: [/*#__PURE__*/_jsx("li", {
            children: t('We do not send any clicks, pageviews or events to a central server')
          }), /*#__PURE__*/_jsx("li", {
            children: t('We do not use any trackers or analytics')
          }), /*#__PURE__*/_jsx("li", {
            children: t("We don't collect keys, addresses or any information - your information never leaves this machine")
          })]
        })
      }), /*#__PURE__*/_jsx("p", {
        children: t('... we are not in the information collection business (even anonymized).')
      })]
    }), /*#__PURE__*/_jsx(VerticalSpace, {}), /*#__PURE__*/_jsx(ButtonArea, {
      children: /*#__PURE__*/_jsx(Button, {
        onClick: _onClick,
        children: t('Understood, let me continue')
      })
    })]
  });
};

export default styled(Welcome).withConfig({
  displayName: "Welcome",
  componentId: "sc-17dy7tn-0"
})(({
  theme
}) => `
  p {
    color: ${theme.subTextColor};
    margin-bottom: 6px;
    margin-top: 0;
  }
`);