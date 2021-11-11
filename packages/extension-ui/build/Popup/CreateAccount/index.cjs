"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../../components/index.cjs");

var _AccountNamePasswordCreation = _interopRequireDefault(require("../../components/AccountNamePasswordCreation.cjs"));

var _useGenesisHashOptions = _interopRequireDefault(require("../../hooks/useGenesisHashOptions.cjs"));

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _messaging = require("../../messaging.cjs");

var _index2 = require("../../partials/index.cjs");

var _defaultType = require("../../util/defaultType.cjs");

var _Mnemonic = _interopRequireDefault(require("./Mnemonic.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function CreateAccount({
  className
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const onAction = (0, _react.useContext)(_index.ActionContext);
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [step, setStep] = (0, _react.useState)(1);
  const [account, setAccount] = (0, _react.useState)(null);
  const [type, setType] = (0, _react.useState)(_defaultType.DEFAULT_TYPE);
  const [name, setName] = (0, _react.useState)('');
  const options = (0, _useGenesisHashOptions.default)();
  const [genesisHash, setGenesis] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    (0, _messaging.createSeed)(undefined, type).then(setAccount).catch(error => console.error(error));
  }, [type]);

  const _onCreate = (0, _react.useCallback)((name, password) => {
    // this should always be the case
    if (name && password && account) {
      setIsBusy(true);
      (0, _messaging.createAccountSuri)(name, password, account.seed, type, genesisHash).then(() => onAction('/')).catch(error => {
        setIsBusy(false);
        console.error(error);
      });
    }
  }, [account, genesisHash, onAction, type]);

  const _onNextStep = (0, _react.useCallback)(() => setStep(step => step + 1), []);

  const _onPreviousStep = (0, _react.useCallback)(() => setStep(step => step - 1), []);

  const _onChangeNetwork = (0, _react.useCallback)(newGenesisHash => {
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

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.HeaderWithSteps, {
      step: step,
      text: t('Create an account')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Loading, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
          address: account === null || account === void 0 ? void 0 : account.address,
          genesisHash: genesisHash,
          name: name
        })
      }), account && (step === 1 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Mnemonic.default, {
        onNextStep: _onNextStep,
        seed: account.seed
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
          className: className,
          label: t('Network'),
          onChange: _onChangeNetwork,
          options: options,
          value: genesisHash
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AccountNamePasswordCreation.default, {
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

var _default = (0, _styledComponents.default)(CreateAccount).withConfig({
  displayName: "CreateAccount",
  componentId: "sc-14zj6aa-0"
})(["margin-bottom:16px;label::after{right:36px;}"]);

exports.default = _default;