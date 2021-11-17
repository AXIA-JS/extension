// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Warning } from "../../components/index.js";
import { useLedger } from "../../hooks/useLedger.js";
import useTranslation from "../../hooks/useTranslation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function LedgerSign({
  accountIndex,
  addressOffset,
  className,
  error,
  genesisHash,
  onSignature,
  payload,
  setError
}) {
  const [isBusy, setIsBusy] = useState(false);
  const {
    t
  } = useTranslation();
  const {
    error: ledgerError,
    isLoading: ledgerLoading,
    isLocked: ledgerLocked,
    ledger,
    refresh,
    warning: ledgerWarning
  } = useLedger(genesisHash, accountIndex, addressOffset);
  useEffect(() => {
    if (ledgerError) {
      setError(ledgerError);
    }
  }, [ledgerError, setError]);

  const _onRefresh = useCallback(() => {
    refresh();
    setError(null);
  }, [refresh, setError]);

  const _onSignLedger = useCallback(() => {
    if (!ledger || !payload || !onSignature) {
      return;
    }

    setError(null);
    setIsBusy(true);
    ledger.sign(payload.toU8a(true), accountIndex, addressOffset).then(signature => {
      onSignature(signature);
    }).catch(e => {
      setError(e.message);
      setIsBusy(false);
    });
  }, [accountIndex, addressOffset, ledger, onSignature, payload, setError]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [!!ledgerWarning && /*#__PURE__*/_jsx(Warning, {
      children: ledgerWarning
    }), error && /*#__PURE__*/_jsx(Warning, {
      isDanger: true,
      children: error
    }), ledgerLocked ? /*#__PURE__*/_jsxs(Button, {
      isBusy: isBusy || ledgerLoading,
      onClick: _onRefresh,
      children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
        icon: faSync
      }), t('Refresh')]
    }) : /*#__PURE__*/_jsx(Button, {
      isBusy: isBusy || ledgerLoading,
      onClick: _onSignLedger,
      children: t('Sign on Ledger')
    })]
  });
}

export default styled(LedgerSign).withConfig({
  displayName: "LedgerSign",
  componentId: "sc-1m2gs0i-0"
})(["flex-direction:column;padding:6px 24px;.danger{margin-bottom:.5rem;}"]);