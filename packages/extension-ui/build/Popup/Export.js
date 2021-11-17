// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { saveAs } from 'file-saver';
import React, { useCallback, useContext, useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { ActionBar, ActionContext, ActionText, Address, Button, InputWithLabel, Warning } from "../components/index.js";
import useTranslation from "../hooks/useTranslation.js";
import { exportAccount } from "../messaging.js";
import { Header } from "../partials/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const MIN_LENGTH = 6;

function Export({
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
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const _goHome = useCallback(() => onAction('/'), [onAction]);

  const onPassChange = useCallback(password => {
    setPass(password);
    setError('');
  }, []);

  const _onExportButtonClick = useCallback(() => {
    setIsBusy(true);
    exportAccount(address, pass).then(({
      exportedJson
    }) => {
      const blob = new Blob([JSON.stringify(exportedJson)], {
        type: 'application/json; charset=utf-8'
      });
      saveAs(blob, `${address}.json`);
      onAction('/');
    }).catch(error => {
      console.error(error);
      setError(error.message);
      setIsBusy(false);
    });
  }, [address, onAction, pass]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      showBackArrow: true,
      text: t('Export account')
    }), /*#__PURE__*/_jsx("div", {
      className: className,
      children: /*#__PURE__*/_jsxs(Address, {
        address: address,
        children: [/*#__PURE__*/_jsx(Warning, {
          className: "movedWarning",
          children: t("You are exporting your account. Keep it safe and don't share it with anyone.")
        }), /*#__PURE__*/_jsxs("div", {
          className: "actionArea",
          children: [/*#__PURE__*/_jsx(InputWithLabel, {
            "data-export-password": true,
            disabled: isBusy,
            isError: pass.length < MIN_LENGTH || !!error,
            label: t('password for this account'),
            onChange: onPassChange,
            type: "password"
          }), error && /*#__PURE__*/_jsx(Warning, {
            isBelowInput: true,
            isDanger: true,
            children: error
          }), /*#__PURE__*/_jsx(Button, {
            className: "export-button",
            "data-export-button": true,
            isBusy: isBusy,
            isDanger: true,
            isDisabled: pass.length === 0 || !!error,
            onClick: _onExportButtonClick,
            children: t('I want to export this account')
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

export default withRouter(styled(Export).withConfig({
  displayName: "Export",
  componentId: "sc-6mupm7-0"
})([".actionArea{padding:10px 24px;}.center{margin:auto;}.export-button{margin-top:6px;}.movedWarning{margin-top:8px;}.withMarginTop{margin-top:4px;}"]));