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

var _uiSettings = _interopRequireDefault(require("@axia-js/ui-settings"));

var _index = require("../components/index.cjs");

var _useLedger = require("../hooks/useLedger.cjs");

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _messaging = require("../messaging.cjs");

var _index2 = require("../partials/index.cjs");

var _legerChains = _interopRequireDefault(require("../util/legerChains.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const AVAIL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

function ImportLedger({
  className
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const [accountIndex, setAccountIndex] = (0, _react.useState)(0);
  const [addressOffset, setAddressOffset] = (0, _react.useState)(0);
  const [error, setError] = (0, _react.useState)(null);
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [genesis, setGenesis] = (0, _react.useState)(null);
  const onAction = (0, _react.useContext)(_index.ActionContext);
  const [name, setName] = (0, _react.useState)(null);
  const {
    address,
    error: ledgerError,
    isLoading: ledgerLoading,
    isLocked: ledgerLocked,
    refresh,
    warning: ledgerWarning
  } = (0, _useLedger.useLedger)(genesis, accountIndex, addressOffset);
  (0, _react.useEffect)(() => {
    if (address) {
      _uiSettings.default.set({
        ledgerConn: 'webusb'
      });
    }
  }, [address]);
  const accOps = (0, _react.useRef)(AVAIL.map(value => ({
    text: t('Account type {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));
  const addOps = (0, _react.useRef)(AVAIL.map(value => ({
    text: t('Address index {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));
  const networkOps = (0, _react.useRef)([{
    text: t('Select network'),
    value: ''
  }, ..._legerChains.default.map(({
    displayName,
    genesisHash
  }) => ({
    text: displayName,
    value: genesisHash[0]
  }))]);

  const _onSave = (0, _react.useCallback)(() => {
    if (address && genesis && name) {
      setIsBusy(true);
      (0, _messaging.createAccountHardware)(address, 'ledger', accountIndex, addressOffset, name, genesis).then(() => onAction('/')).catch(error => {
        console.error(error);
        setIsBusy(false);
        setError(error.message);
      });
    }
  }, [accountIndex, address, addressOffset, genesis, name, onAction]); // select element is returning a string


  const _onSetAccountIndex = (0, _react.useCallback)(value => setAccountIndex(Number(value)), []);

  const _onSetAddressOffset = (0, _react.useCallback)(value => setAddressOffset(Number(value)), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Header, {
      showBackArrow: true,
      text: t('Import Ledger Account')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
        address: address,
        genesisHash: genesis,
        isExternal: true,
        isHardware: true,
        name: name
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
        className: "network",
        label: t('Network'),
        onChange: setGenesis,
        options: networkOps.current,
        value: genesis
      }), !!genesis && !!address && !ledgerError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Name, {
        onChange: setName,
        value: name || ''
      }), !!name && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
          className: "accountType",
          isDisabled: ledgerLoading,
          label: t('account type'),
          onChange: _onSetAccountIndex,
          options: accOps.current,
          value: accountIndex
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
          className: "accountIndex",
          isDisabled: ledgerLoading,
          label: t('address index'),
          onChange: _onSetAddressOffset,
          options: addOps.current,
          value: addressOffset
        })]
      }), !!ledgerWarning && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
        children: ledgerWarning
      }), (!!error || !!ledgerError) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
        isDanger: true,
        children: error || ledgerError
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.VerticalSpace, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ButtonArea, {
      children: ledgerLocked ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Button, {
        isBusy: ledgerLoading || isBusy,
        onClick: refresh,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faSync
        }), t('Refresh')]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
        isBusy: ledgerLoading || isBusy,
        isDisabled: !!error || !!ledgerError || !address || !genesis,
        onClick: _onSave,
        children: t('Import Account')
      })
    })]
  });
}

var _default = (0, _styledComponents.default)(ImportLedger).withConfig({
  displayName: "ImportLedger",
  componentId: "sc-1gcllnb-0"
})([".refreshIcon{margin-right:0.3rem;}"]);

exports.default = _default;