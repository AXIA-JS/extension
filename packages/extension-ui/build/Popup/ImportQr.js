import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useState } from 'react';
import { QrScanAddress } from '@axia-js/react-qr';
import { ActionContext, Address, ButtonArea, NextStepButton, VerticalSpace } from "../components/index.js";
import useTranslation from "../hooks/useTranslation.js";
import { createAccountExternal } from "../messaging.js";
import { Header, Name } from "../partials/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ImportQr() {
  const {
    t
  } = useTranslation();
  const onAction = useContext(ActionContext);
  const [account, setAccount] = useState(null);
  const [name, setName] = useState(null);

  const _setAccount = useCallback(qrAccount => {
    setAccount(qrAccount);
    setName((qrAccount === null || qrAccount === void 0 ? void 0 : qrAccount.name) || null);
  }, []);

  const _onCreate = useCallback(() => {
    if (account && name) {
      createAccountExternal(name, account.content, account.genesisHash).then(() => onAction('/')).catch(error => console.error(error));
    }
  }, [account, name, onAction]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      showBackArrow: true,
      text: t('Scan Address Qr')
    }), !account && /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(QrScanAddress, {
        onScan: _setAccount
      })
    }), account && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Address, _objectSpread(_objectSpread({}, account), {}, {
          address: account.content,
          isExternal: true,
          name: name
        }))
      }), /*#__PURE__*/_jsx(Name, {
        isFocused: true,
        onChange: setName,
        value: name || ''
      }), /*#__PURE__*/_jsx(VerticalSpace, {}), /*#__PURE__*/_jsx(ButtonArea, {
        children: /*#__PURE__*/_jsx(NextStepButton, {
          isDisabled: !name,
          onClick: _onCreate,
          children: t('Add the account with identified address')
        })
      })]
    })]
  });
}