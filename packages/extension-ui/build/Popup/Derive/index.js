// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { AccountContext, AccountNamePasswordCreation, ActionContext, Address } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { deriveAccount } from "../../messaging.js";
import { HeaderWithSteps } from "../../partials/index.js";
import SelectParent from "./SelectParent.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Derive({
  isLocked
}) {
  const {
    t
  } = useTranslation();
  const onAction = useContext(ActionContext);
  const {
    accounts
  } = useContext(AccountContext);
  const {
    address: parentAddress
  } = useParams();
  const [isBusy, setIsBusy] = useState(false);
  const [account, setAccount] = useState(null);
  const [name, setName] = useState(null);
  const [parentPassword, setParentPassword] = useState(null);
  const parentGenesis = useMemo(() => {
    var _accounts$find;

    return ((_accounts$find = accounts.find(a => a.address === parentAddress)) === null || _accounts$find === void 0 ? void 0 : _accounts$find.genesisHash) || null;
  }, [accounts, parentAddress]);

  const _onCreate = useCallback((name, password) => {
    if (!account || !name || !password || !parentPassword) {
      return;
    }

    setIsBusy(true);
    deriveAccount(parentAddress, account.suri, parentPassword, name, password, parentGenesis).then(() => onAction('/')).catch(error => {
      setIsBusy(false);
      console.error(error);
    });
  }, [account, onAction, parentAddress, parentGenesis, parentPassword]);

  const _onDerivationConfirmed = useCallback(({
    account,
    parentPassword
  }) => {
    setAccount(account);
    setParentPassword(parentPassword);
  }, []);

  const _onBackClick = useCallback(() => {
    setAccount(null);
  }, []);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(HeaderWithSteps, {
      step: account ? 2 : 1,
      text: t('Add new account')
    }), !account && /*#__PURE__*/_jsx(SelectParent, {
      isLocked: isLocked,
      onDerivationConfirmed: _onDerivationConfirmed,
      parentAddress: parentAddress,
      parentGenesis: parentGenesis
    }), account && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Address, {
          address: account.address,
          genesisHash: parentGenesis,
          name: name
        })
      }), /*#__PURE__*/_jsx(AccountNamePasswordCreation, {
        buttonLabel: t('Create derived account'),
        isBusy: isBusy,
        onBackClick: _onBackClick,
        onCreate: _onCreate,
        onNameChange: setName
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Derive);