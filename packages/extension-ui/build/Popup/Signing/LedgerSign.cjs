"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../../components/index.cjs");

var _useLedger = require("../../hooks/useLedger.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const {
    t
  } = (0, _useTranslation.default)();
  const {
    error: ledgerError,
    isLoading: ledgerLoading,
    isLocked: ledgerLocked,
    ledger,
    refresh,
    warning: ledgerWarning
  } = (0, _useLedger.useLedger)(genesisHash, accountIndex, addressOffset);
  (0, _react.useEffect)(() => {
    if (ledgerError) {
      setError(ledgerError);
    }
  }, [ledgerError, setError]);

  const _onRefresh = (0, _react.useCallback)(() => {
    refresh();
    setError(null);
  }, [refresh, setError]);

  const _onSignLedger = (0, _react.useCallback)(() => {
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

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [!!ledgerWarning && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
      children: ledgerWarning
    }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
      isDanger: true,
      children: error
    }), ledgerLocked ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Button, {
      isBusy: isBusy || ledgerLoading,
      onClick: _onRefresh,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faSync
      }), t('Refresh')]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
      isBusy: isBusy || ledgerLoading,
      onClick: _onSignLedger,
      children: t('Sign on Ledger')
    })]
  });
}

var _default = (0, _styledComponents.default)(LedgerSign).withConfig({
  displayName: "LedgerSign",
  componentId: "sc-1qi27xg-0"
})(["flex-direction:column;padding:6px 24px;.danger{margin-bottom:.5rem;}"]);

exports.default = _default;