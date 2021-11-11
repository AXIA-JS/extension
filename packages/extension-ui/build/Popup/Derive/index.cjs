"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _index = require("../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _messaging = require("../../messaging.cjs");

var _index2 = require("../../partials/index.cjs");

var _SelectParent = _interopRequireDefault(require("./SelectParent.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Derive({
  isLocked
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const onAction = (0, _react.useContext)(_index.ActionContext);
  const {
    accounts
  } = (0, _react.useContext)(_index.AccountContext);
  const {
    address: parentAddress
  } = (0, _reactRouter.useParams)();
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [account, setAccount] = (0, _react.useState)(null);
  const [name, setName] = (0, _react.useState)(null);
  const [parentPassword, setParentPassword] = (0, _react.useState)(null);
  const parentGenesis = (0, _react.useMemo)(() => {
    var _accounts$find;

    return ((_accounts$find = accounts.find(a => a.address === parentAddress)) === null || _accounts$find === void 0 ? void 0 : _accounts$find.genesisHash) || null;
  }, [accounts, parentAddress]);

  const _onCreate = (0, _react.useCallback)((name, password) => {
    if (!account || !name || !password || !parentPassword) {
      return;
    }

    setIsBusy(true);
    (0, _messaging.deriveAccount)(parentAddress, account.suri, parentPassword, name, password, parentGenesis).then(() => onAction('/')).catch(error => {
      setIsBusy(false);
      console.error(error);
    });
  }, [account, onAction, parentAddress, parentGenesis, parentPassword]);

  const _onDerivationConfirmed = (0, _react.useCallback)(({
    account,
    parentPassword
  }) => {
    setAccount(account);
    setParentPassword(parentPassword);
  }, []);

  const _onBackClick = (0, _react.useCallback)(() => {
    setAccount(null);
  }, []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.HeaderWithSteps, {
      step: account ? 2 : 1,
      text: t('Add new account')
    }), !account && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectParent.default, {
      isLocked: isLocked,
      onDerivationConfirmed: _onDerivationConfirmed,
      parentAddress: parentAddress,
      parentGenesis: parentGenesis
    }), account && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
          address: account.address,
          genesisHash: parentGenesis,
          name: name
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.AccountNamePasswordCreation, {
        buttonLabel: t('Create derived account'),
        isBusy: isBusy,
        onBackClick: _onBackClick,
        onCreate: _onCreate,
        onNameChange: setName
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Derive);

exports.default = _default;