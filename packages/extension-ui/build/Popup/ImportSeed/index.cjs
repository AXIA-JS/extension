"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../../components/index.cjs");

var _AccountNamePasswordCreation = _interopRequireDefault(require("../../components/AccountNamePasswordCreation.cjs"));

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _messaging = require("../../messaging.cjs");

var _index2 = require("../../partials/index.cjs");

var _SeedAndPath = _interopRequireDefault(require("./SeedAndPath.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ImportSeed() {
  const {
    t
  } = (0, _useTranslation.default)();
  const {
    accounts
  } = (0, _react.useContext)(_index.AccountContext);
  const onAction = (0, _react.useContext)(_index.ActionContext);
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [account, setAccount] = (0, _react.useState)(null);
  const [name, setName] = (0, _react.useState)(null);
  const [step1, setStep1] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    !accounts.length && onAction();
  }, [accounts, onAction]);

  const _onCreate = (0, _react.useCallback)((name, password) => {
    // this should always be the case
    if (name && password && account) {
      setIsBusy(true);
      (0, _messaging.createAccountSuri)(name, password, account.suri, undefined, account.genesis).then(() => onAction('/')).catch(error => {
        setIsBusy(false);
        console.error(error);
      });
    }
  }, [account, onAction]);

  const _onNextStep = (0, _react.useCallback)(() => {
    setStep1(false);
  }, []);

  const _onBackClick = (0, _react.useCallback)(() => {
    setStep1(true);
  }, []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.HeaderWithSteps, {
      step: step1 ? 1 : 2,
      text: t('Import account')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
        address: account === null || account === void 0 ? void 0 : account.address,
        genesisHash: account === null || account === void 0 ? void 0 : account.genesis,
        name: name
      })
    }), step1 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeedAndPath.default, {
      onAccountChange: setAccount,
      onNextStep: _onNextStep
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_AccountNamePasswordCreation.default, {
      buttonLabel: t('Add the account with the supplied seed'),
      isBusy: isBusy,
      onBackClick: _onBackClick,
      onCreate: _onCreate,
      onNameChange: setName
    })]
  });
}

var _default = ImportSeed;
exports.default = _default;