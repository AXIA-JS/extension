// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AccountContext, ActionContext, Address } from "../../components/index.js";
import AccountNamePasswordCreation from "../../components/AccountNamePasswordCreation.js";
import useTranslation from "../../hooks/useTranslation.js";
import { createAccountSuri } from "../../messaging.js";
import { HeaderWithSteps } from "../../partials/index.js";
import SeedAndPath from "./SeedAndPath.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ImportSeed() {
  const {
    t
  } = useTranslation();
  const {
    accounts
  } = useContext(AccountContext);
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const [account, setAccount] = useState(null);
  const [name, setName] = useState(null);
  const [step1, setStep1] = useState(true);
  useEffect(() => {
    !accounts.length && onAction();
  }, [accounts, onAction]);

  const _onCreate = useCallback((name, password) => {
    // this should always be the case
    if (name && password && account) {
      setIsBusy(true);
      createAccountSuri(name, password, account.suri, undefined, account.genesis).then(() => onAction('/')).catch(error => {
        setIsBusy(false);
        console.error(error);
      });
    }
  }, [account, onAction]);

  const _onNextStep = useCallback(() => {
    setStep1(false);
  }, []);

  const _onBackClick = useCallback(() => {
    setStep1(true);
  }, []);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(HeaderWithSteps, {
      step: step1 ? 1 : 2,
      text: t('Import account')
    }), /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(Address, {
        address: account === null || account === void 0 ? void 0 : account.address,
        genesisHash: account === null || account === void 0 ? void 0 : account.genesis,
        name: name
      })
    }), step1 ? /*#__PURE__*/_jsx(SeedAndPath, {
      onAccountChange: setAccount,
      onNextStep: _onNextStep
    }) : /*#__PURE__*/_jsx(AccountNamePasswordCreation, {
      buttonLabel: t('Add the account with the supplied seed'),
      isBusy: isBusy,
      onBackClick: _onBackClick,
      onCreate: _onCreate,
      onNameChange: setName
    })]
  });
}

export default ImportSeed;