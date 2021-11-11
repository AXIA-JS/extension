// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { canDerive } from '@axia-js/extension-base/utils';
import { AccountContext, ActionContext, Address, ButtonArea, InputWithLabel, Label, NextStepButton, VerticalSpace, Warning } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { validateAccount, validateDerivationPath } from "../../messaging.js";
import { nextDerivationPath } from "../../util/nextDerivationPath.js";
import AddressDropdown from "./AddressDropdown.js";
import DerivationPath from "./DerivationPath.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
// match any single slash
const singleSlashRegex = /([^/]|^)\/([^/]|$)/;
export default function SelectParent({
  className,
  isLocked,
  onDerivationConfirmed,
  parentAddress,
  parentGenesis
}) {
  const {
    t
  } = useTranslation();
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const {
    accounts,
    hierarchy
  } = useContext(AccountContext);
  const defaultPath = useMemo(() => nextDerivationPath(accounts, parentAddress), [accounts, parentAddress]);
  const [suriPath, setSuriPath] = useState(defaultPath);
  const [parentPassword, setParentPassword] = useState('');
  const [isProperParentPassword, setIsProperParentPassword] = useState(false);
  const [pathError, setPathError] = useState('');
  const passwordInputRef = useRef(null);
  const allowSoftDerivation = useMemo(() => {
    const parent = accounts.find(({
      address
    }) => address === parentAddress);
    return (parent === null || parent === void 0 ? void 0 : parent.type) === 'sr25519';
  }, [accounts, parentAddress]); // reset the password field if the parent address changes

  useEffect(() => {
    setParentPassword('');
  }, [parentAddress]);
  useEffect(() => {
    // forbid the use of password since Keyring ignores it
    if (suriPath !== null && suriPath !== void 0 && suriPath.includes('///')) {
      setPathError(t('`///password` not supported for derivation'));
    }

    if (!allowSoftDerivation && suriPath && singleSlashRegex.test(suriPath)) {
      setPathError(t('Soft derivation is only allowed for sr25519 accounts'));
    }
  }, [allowSoftDerivation, suriPath, t]);
  const allAddresses = useMemo(() => hierarchy.filter(({
    isExternal
  }) => !isExternal).filter(({
    type
  }) => canDerive(type)).map(({
    address,
    genesisHash
  }) => [address, genesisHash || null]), [hierarchy]);

  const _onParentPasswordEnter = useCallback(parentPassword => {
    setParentPassword(parentPassword);
    setIsProperParentPassword(!!parentPassword);
  }, []);

  const _onSuriPathChange = useCallback(path => {
    setSuriPath(path);
    setPathError('');
  }, []);

  const _onParentChange = useCallback(address => onAction(`/account/derive/${address}`), [onAction]);

  const _onSubmit = useCallback(async () => {
    if (suriPath && parentAddress && parentPassword) {
      setIsBusy(true);
      const isUnlockable = await validateAccount(parentAddress, parentPassword);

      if (isUnlockable) {
        try {
          const account = await validateDerivationPath(parentAddress, suriPath, parentPassword);
          onDerivationConfirmed({
            account,
            parentPassword
          });
        } catch (error) {
          setIsBusy(false);
          setPathError(t('Invalid derivation path'));
          console.error(error);
        }
      } else {
        setIsBusy(false);
        setIsProperParentPassword(false);
      }
    }
  }, [parentAddress, parentPassword, onDerivationConfirmed, suriPath, t]);

  useEffect(() => {
    var _passwordInputRef$cur, _passwordInputRef$cur2;

    setParentPassword('');
    setIsProperParentPassword(false);
    (_passwordInputRef$cur = passwordInputRef.current) === null || _passwordInputRef$cur === void 0 ? void 0 : (_passwordInputRef$cur2 = _passwordInputRef$cur.querySelector('input')) === null || _passwordInputRef$cur2 === void 0 ? void 0 : _passwordInputRef$cur2.focus();
  }, [_onParentPasswordEnter]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: className,
      children: [isLocked ? /*#__PURE__*/_jsx(Address, {
        address: parentAddress,
        genesisHash: parentGenesis
      }) : /*#__PURE__*/_jsx(Label, {
        label: t('Choose Parent Account:'),
        children: /*#__PURE__*/_jsx(AddressDropdown, {
          allAddresses: allAddresses,
          onSelect: _onParentChange,
          selectedAddress: parentAddress,
          selectedGenesis: parentGenesis
        })
      }), /*#__PURE__*/_jsxs("div", {
        ref: passwordInputRef,
        children: [/*#__PURE__*/_jsx(InputWithLabel, {
          "data-input-password": true,
          isError: !!parentPassword && !isProperParentPassword,
          isFocused: true,
          label: t('enter the password for the account you want to derive from'),
          onChange: _onParentPasswordEnter,
          type: "password",
          value: parentPassword
        }), !!parentPassword && !isProperParentPassword && /*#__PURE__*/_jsx(Warning, {
          isBelowInput: true,
          isDanger: true,
          children: t('Wrong password')
        })]
      }), isProperParentPassword && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(DerivationPath, {
          defaultPath: defaultPath,
          isError: !!pathError,
          onChange: _onSuriPathChange,
          parentAddress: parentAddress,
          parentPassword: parentPassword,
          withSoftPath: allowSoftDerivation
        }), !!pathError && /*#__PURE__*/_jsx(Warning, {
          isBelowInput: true,
          isDanger: true,
          children: pathError
        })]
      })]
    }), /*#__PURE__*/_jsx(VerticalSpace, {}), /*#__PURE__*/_jsx(ButtonArea, {
      children: /*#__PURE__*/_jsx(NextStepButton, {
        "data-button-action": "create derived account",
        isBusy: isBusy,
        isDisabled: !isProperParentPassword || !!pathError,
        onClick: _onSubmit,
        children: t('Create a derived account')
      })
    })]
  });
}