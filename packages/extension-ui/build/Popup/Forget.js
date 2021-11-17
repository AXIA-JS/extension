// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { ActionBar, ActionContext, ActionText, Address, Button, Warning } from "../components/index.js";
import useTranslation from "../hooks/useTranslation.js";
import { forgetAccount } from "../messaging.js";
import { Header } from "../partials/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Forget({
  className,
  match: {
    params: {
      address
    }
  }
}) {
  const {
    t
  } = useTranslation();
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);

  const _goHome = useCallback(() => onAction('/'), [onAction]);

  const _onClick = useCallback(() => {
    setIsBusy(true);
    forgetAccount(address).then(() => {
      setIsBusy(false);
      onAction('/');
    }).catch(error => {
      setIsBusy(false);
      console.error(error);
    });
  }, [address, onAction]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      showBackArrow: true,
      text: t('Forget account')
    }), /*#__PURE__*/_jsx("div", {
      className: className,
      children: /*#__PURE__*/_jsxs(Address, {
        address: address,
        children: [/*#__PURE__*/_jsx(Warning, {
          className: "movedWarning",
          children: t('You are about to remove the account. This means that you will not be able to access it via this extension anymore. If you wish to recover it, you would need to use the seed.')
        }), /*#__PURE__*/_jsxs("div", {
          className: "actionArea",
          children: [/*#__PURE__*/_jsx(Button, {
            isBusy: isBusy,
            isDanger: true,
            onClick: _onClick,
            children: t('I want to forget this account')
          }), /*#__PURE__*/_jsx(ActionBar, {
            className: "withMarginTop",
            children: /*#__PURE__*/_jsx(ActionText, {
              className: "center",
              onClick: _goHome,
              text: t('Cancel')
            })
          })]
        })]
      })
    })]
  });
}

export default withRouter(styled(Forget).withConfig({
  displayName: "Forget",
  componentId: "sc-1q3ammg-0"
})([".actionArea{padding:10px 24px;}.center{margin:auto;}.movedWarning{margin-top:8px;}.withMarginTop{margin-top:4px;}"]));