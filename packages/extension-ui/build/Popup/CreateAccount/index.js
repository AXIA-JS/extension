// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ActionContext, Address, Dropdown, Loading } from "../../components/index.js";
import AccountNamePasswordCreation from "../../components/AccountNamePasswordCreation.js";
import useGenesisHashOptions from "../../hooks/useGenesisHashOptions.js";
import useTranslation from "../../hooks/useTranslation.js";
import { createAccountSuri, createSeed } from "../../messaging.js";
import { HeaderWithSteps } from "../../partials/index.js";
import { DEFAULT_TYPE } from "../../util/defaultType.js";
import Mnemonic from "./Mnemonic.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function CreateAccount({
  className
}) {
  const {
    t
  } = useTranslation();
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState(null);
  const [type, setType] = useState(DEFAULT_TYPE);
  const [name, setName] = useState('');
  const options = useGenesisHashOptions();
  const [genesisHash, setGenesis] = useState('');
  useEffect(() => {
    createSeed(undefined, type).then(setAccount).catch(error => console.error(error));
  }, [type]);

  const _onCreate = useCallback((name, password) => {
    // this should always be the case
    if (name && password && account) {
      setIsBusy(true);
      createAccountSuri(name, password, account.seed, type, genesisHash).then(() => onAction('/')).catch(error => {
        setIsBusy(false);
        console.error(error);
      });
    }
  }, [account, genesisHash, onAction, type]);

  const _onNextStep = useCallback(() => setStep(step => step + 1), []);

  const _onPreviousStep = useCallback(() => setStep(step => step - 1), []);

  const _onChangeNetwork = useCallback(newGenesisHash => {
    const chain = options.find(({
      value
    }) => {
      return newGenesisHash === value;
    });

    if ((chain === null || chain === void 0 ? void 0 : chain.text) === 'Moonbase Alpha') {
      // TODO: use list
      setType('ethereum');
    }

    setGenesis(newGenesisHash);
  }, [options]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(HeaderWithSteps, {
      step: step,
      text: t('Create an account')
    }), /*#__PURE__*/_jsxs(Loading, {
      children: [/*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Address, {
          address: account === null || account === void 0 ? void 0 : account.address,
          genesisHash: genesisHash,
          name: name
        })
      }), account && (step === 1 ? /*#__PURE__*/_jsx(Mnemonic, {
        onNextStep: _onNextStep,
        seed: account.seed
      }) : /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Dropdown, {
          className: className,
          label: t('Network'),
          onChange: _onChangeNetwork,
          options: options,
          value: genesisHash
        }), /*#__PURE__*/_jsx(AccountNamePasswordCreation, {
          buttonLabel: t('Add the account with the generated seed'),
          isBusy: isBusy,
          onBackClick: _onPreviousStep,
          onCreate: _onCreate,
          onNameChange: setName
        })]
      }))]
    })]
  });
}

export default styled(CreateAccount).withConfig({
  displayName: "CreateAccount",
  componentId: "sc-4xgak2-0"
})(["margin-bottom:16px;label::after{right:36px;}"]);