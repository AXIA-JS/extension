"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLedger = useLedger;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _hwLedger = require("@axia-js/hw-ledger");

var _uiSettings = _interopRequireDefault(require("@axia-js/ui-settings"));

var _util = require("@axia-js/util");

var _legerChains = _interopRequireDefault(require("../util/legerChains.cjs"));

var _useTranslation = _interopRequireDefault(require("./useTranslation.cjs"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getNetwork(genesis) {
  return _legerChains.default.find(({
    genesisHash
  }) => genesisHash[0] === genesis);
}

function retrieveLedger(genesis) {
  let ledger = null;
  const {
    isLedgerCapable
  } = getState();
  (0, _util.assert)(isLedgerCapable, 'Incompatible browser, only Chrome is supported');
  const def = getNetwork(genesis);
  (0, _util.assert)(def, `Unable to find supported chain for ${genesis}`);
  ledger = new _hwLedger.Ledger('webusb', def.network);
  return ledger;
}

function getState() {
  const isLedgerCapable = !!window.USB;
  return {
    isLedgerCapable,
    isLedgerEnabled: isLedgerCapable && _uiSettings.default.ledgerConn !== 'none'
  };
}

function useLedger(genesis, accountIndex = 0, addressOffset = 0) {
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const [isLocked, setIsLocked] = (0, _react.useState)(false);
  const [refreshLock, setRefreshLock] = (0, _react.useState)(false);
  const [warning, setWarning] = (0, _react.useState)(null);
  const [error, setError] = (0, _react.useState)(null);
  const [address, setAddress] = (0, _react.useState)(null);
  const {
    t
  } = (0, _useTranslation.default)();
  const ledger = (0, _react.useMemo)(() => {
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
  (0, _react.useEffect)(() => {
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
  const refresh = (0, _react.useCallback)(() => {
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