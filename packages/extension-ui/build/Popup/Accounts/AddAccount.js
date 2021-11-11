// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { ActionContext } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import Header from "../../partials/Header.js";
import AddAccountImage from "./AddAccountImage.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function AddAccount({
  className
}) {
  const {
    t
  } = useTranslation();
  const onAction = useContext(ActionContext);

  const _onClick = useCallback(() => onAction('/account/create'), [onAction]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      showAdd: true,
      showSettings: true,
      text: t('Add Account')
    }), /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [/*#__PURE__*/_jsx("div", {
        className: "image",
        children: /*#__PURE__*/_jsx(AddAccountImage, {
          onClick: _onClick
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "no-accounts",
        children: /*#__PURE__*/_jsx("p", {
          children: t("You currently don't have any accounts. Create your first account to get started.")
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(AddAccount).withConfig({
  displayName: "AddAccount",
  componentId: "sc-92mcc7-0"
})(({
  theme
}) => `
  color: ${theme.textColor};
  height: 100%;

  h3 {
    color: ${theme.textColor};
    margin-top: 0;
    font-weight: normal;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
  }

  > .image {
    display: flex;
    justify-content: center;
  }

  > .no-accounts p {
    text-align: center;
    font-size: 16px;
    line-height: 26px;
    margin: 0 30px;
    color: ${theme.subTextColor};
  }
`));