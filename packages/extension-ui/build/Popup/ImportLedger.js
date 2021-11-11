// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import settings from '@axia-js/ui-settings';
import { ActionContext, Address, Button, ButtonArea, Dropdown, VerticalSpace, Warning } from "../components/index.js";
import { useLedger } from "../hooks/useLedger.js";
import useTranslation from "../hooks/useTranslation.js";
import { createAccountHardware } from "../messaging.js";
import { Header, Name } from "../partials/index.js";
import ledgerChains from "../util/legerChains.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const AVAIL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

function ImportLedger({
  className
}) {
  const {
    t
  } = useTranslation();
  const [accountIndex, setAccountIndex] = useState(0);
  const [addressOffset, setAddressOffset] = useState(0);
  const [error, setError] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [genesis, setGenesis] = useState(null);
  const onAction = useContext(ActionContext);
  const [name, setName] = useState(null);
  const {
    address,
    error: ledgerError,
    isLoading: ledgerLoading,
    isLocked: ledgerLocked,
    refresh,
    warning: ledgerWarning
  } = useLedger(genesis, accountIndex, addressOffset);
  useEffect(() => {
    if (address) {
      settings.set({
        ledgerConn: 'webusb'
      });
    }
  }, [address]);
  const accOps = useRef(AVAIL.map(value => ({
    text: t('Account type {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));
  const addOps = useRef(AVAIL.map(value => ({
    text: t('Address index {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));
  const networkOps = useRef([{
    text: t('Select network'),
    value: ''
  }, ...ledgerChains.map(({
    displayName,
    genesisHash
  }) => ({
    text: displayName,
    value: genesisHash[0]
  }))]);

  const _onSave = useCallback(() => {
    if (address && genesis && name) {
      setIsBusy(true);
      createAccountHardware(address, 'ledger', accountIndex, addressOffset, name, genesis).then(() => onAction('/')).catch(error => {
        console.error(error);
        setIsBusy(false);
        setError(error.message);
      });
    }
  }, [accountIndex, address, addressOffset, genesis, name, onAction]); // select element is returning a string


  const _onSetAccountIndex = useCallback(value => setAccountIndex(Number(value)), []);

  const _onSetAddressOffset = useCallback(value => setAddressOffset(Number(value)), []);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      showBackArrow: true,
      text: t('Import Ledger Account')
    }), /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [/*#__PURE__*/_jsx(Address, {
        address: address,
        genesisHash: genesis,
        isExternal: true,
        isHardware: true,
        name: name
      }), /*#__PURE__*/_jsx(Dropdown, {
        className: "network",
        label: t('Network'),
        onChange: setGenesis,
        options: networkOps.current,
        value: genesis
      }), !!genesis && !!address && !ledgerError && /*#__PURE__*/_jsx(Name, {
        onChange: setName,
        value: name || ''
      }), !!name && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Dropdown, {
          className: "accountType",
          isDisabled: ledgerLoading,
          label: t('account type'),
          onChange: _onSetAccountIndex,
          options: accOps.current,
          value: accountIndex
        }), /*#__PURE__*/_jsx(Dropdown, {
          className: "accountIndex",
          isDisabled: ledgerLoading,
          label: t('address index'),
          onChange: _onSetAddressOffset,
          options: addOps.current,
          value: addressOffset
        })]
      }), !!ledgerWarning && /*#__PURE__*/_jsx(Warning, {
        children: ledgerWarning
      }), (!!error || !!ledgerError) && /*#__PURE__*/_jsx(Warning, {
        isDanger: true,
        children: error || ledgerError
      })]
    }), /*#__PURE__*/_jsx(VerticalSpace, {}), /*#__PURE__*/_jsx(ButtonArea, {
      children: ledgerLocked ? /*#__PURE__*/_jsxs(Button, {
        isBusy: ledgerLoading || isBusy,
        onClick: refresh,
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faSync
        }), t('Refresh')]
      }) : /*#__PURE__*/_jsx(Button, {
        isBusy: ledgerLoading || isBusy,
        isDisabled: !!error || !!ledgerError || !address || !genesis,
        onClick: _onSave,
        children: t('Import Account')
      })
    })]
  });
}

export default styled(ImportLedger).withConfig({
  displayName: "ImportLedger",
  componentId: "sc-1gcllnb-0"
})([".refreshIcon{margin-right:0.3rem;}"]);