import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Ledger } from '@axia-js/hw-ledger';
import uiSettings from '@axia-js/ui-settings';
import { assert } from '@axia-js/util';
import ledgerChains from "../util/legerChains.js";
import useTranslation from "./useTranslation.js";

function getNetwork(genesis) {
  return ledgerChains.find(({
    genesisHash
  }) => genesisHash[0] === genesis);
}

function retrieveLedger(genesis) {
  let ledger = null;
  const {
    isLedgerCapable
  } = getState();
  assert(isLedgerCapable, 'Incompatible browser, only Chrome is supported');
  const def = getNetwork(genesis);
  assert(def, `Unable to find supported chain for ${genesis}`);
  ledger = new Ledger('webusb', def.network);
  return ledger;
}

function getState() {
  const isLedgerCapable = !!window.USB;
  return {
    isLedgerCapable,
    isLedgerEnabled: isLedgerCapable && uiSettings.ledgerConn !== 'none'
  };
}

export function useLedger(genesis, accountIndex = 0, addressOffset = 0) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [refreshLock, setRefreshLock] = useState(false);
  const [warning, setWarning] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const {
    t
  } = useTranslation();
  const ledger = useMemo(() => {
    setIsLocked(false);
    setRefreshLock(false); // this trick allows to refresh the ledger on demand
    // when it is shown as locked and the user has actually
    // unlocked it, which we can't know.

    if (refreshLock || genesis) {
      if (!genesis) {
        return null;
      }

      return retrieveLedger(genesis);
    }

    return null;
  }, [genesis, refreshLock]);
  useEffect(() => {
    if (!ledger || !genesis) {
      setAddress(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setWarning(null);
    ledger.getAddress(false, accountIndex, addressOffset).then(res => {
      setIsLoading(false);
      setAddress(res.address);
    }).catch(e => {
      setIsLoading(false);
      const {
        network
      } = getNetwork(genesis) || {
        network: 'unknown network'
      };
      const warningMessage = e.message.includes('Code: 26628') ? t('Is your ledger locked?') : null;
      const errorMessage = e.message.includes('App does not seem to be open') ? t('App "{{network}}" does not seem to be open', {
        replace: {
          network
        }
      }) : e.message;
      setIsLocked(true);
      setWarning(warningMessage);
      setError(t('Ledger error: {{errorMessage}}', {
        replace: {
          errorMessage
        }
      }));
      console.error(e);
      setAddress(null);
    }); // If the dependency array is exhaustive, with t, the translation function, it
    // triggers a useless re-render when ledger device is connected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountIndex, addressOffset, genesis, ledger]);
  const refresh = useCallback(() => {
    setRefreshLock(true);
    setError(null);
    setWarning(null);
  }, []);
  return _objectSpread(_objectSpread({}, getState()), {}, {
    address,
    error,
    isLoading,
    isLocked,
    ledger,
    refresh,
    warning
  });
}