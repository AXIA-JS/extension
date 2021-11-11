"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectParent;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("@axia-js/extension-base/utils");

var _index = require("../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _messaging = require("../../messaging.cjs");

var _nextDerivationPath = require("../../util/nextDerivationPath.cjs");

var _AddressDropdown = _interopRequireDefault(require("./AddressDropdown.cjs"));

var _DerivationPath = _interopRequireDefault(require("./DerivationPath.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// match any single slash
const singleSlashRegex = /([^/]|^)\/([^/]|$)/;

function SelectParent({
  className,
  isLocked,
  onDerivationConfirmed,
  parentAddress,
  parentGenesis
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const onAction = (0, _react.useContext)(_index.ActionContext);
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const {
    accounts,
    hierarchy
  } = (0, _react.useContext)(_index.AccountContext);
  const defaultPath = (0, _react.useMemo)(() => (0, _nextDerivationPath.nextDerivationPath)(accounts, parentAddress), [accounts, parentAddress]);
  const [suriPath, setSuriPath] = (0, _react.useState)(defaultPath);
  const [parentPassword, setParentPassword] = (0, _react.useState)('');
  const [isProperParentPassword, setIsProperParentPassword] = (0, _react.useState)(false);
  const [pathError, setPathError] = (0, _react.useState)('');
  const passwordInputRef = (0, _react.useRef)(null);
  const allowSoftDerivation = (0, _react.useMemo)(() => {
    const parent = accounts.find(({
      address
    }) => address === parentAddress);
    return (parent === null || parent === void 0 ? void 0 : parent.type) === 'sr25519';
  }, [accounts, parentAddress]); // reset the password field if the parent address changes

  (0, _react.useEffect)(() => {
    setParentPassword('');
  }, [parentAddress]);
  (0, _react.useEffect)(() => {
    // forbid the use of password since Keyring ignores it
    if (suriPath !== null && suriPath !== void 0 && suriPath.includes('///')) {
      setPathError(t('`///password` not supported for derivation'));
    }

    if (!allowSoftDerivation && suriPath && singleSlashRegex.test(suriPath)) {
      setPathError(t('Soft derivation is only allowed for sr25519 accounts'));
    }
  }, [allowSoftDerivation, suriPath, t]);
  const allAddresses = (0, _react.useMemo)(() => hierarchy.filter(({
    isExternal
  }) => !isExternal).filter(({
    type
  }) => (0, _utils.canDerive)(type)).map(({
    address,
    genesisHash
  }) => [address, genesisHash || null]), [hierarchy]);

  const _onParentPasswordEnter = (0, _react.useCallback)(parentPassword => {
    setParentPassword(parentPassword);
    setIsProperParentPassword(!!parentPassword);
  }, []);

  const _onSuriPathChange = (0, _react.useCallback)(path => {
    setSuriPath(path);
    setPathError('');
  }, []);

  const _onParentChange = (0, _react.useCallback)(address => onAction(`/account/derive/${address}`), [onAction]);

  const _onSubmit = (0, _react.useCallback)(async () => {
    if (suriPath && parentAddress && parentPassword) {
      setIsBusy(true);
      const isUnlockable = await (0, _messaging.validateAccount)(parentAddress, parentPassword);

      if (isUnlockable) {
        try {
          const account = await (0, _messaging.validateDerivationPath)(parentAddress, suriPath, parentPassword);
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

  (0, _react.useEffect)(() => {
    var _passwordInputRef$cur, _passwordInputRef$cur2;

    setParentPassword('');
    setIsProperParentPassword(false);
    (_passwordInputRef$cur = passwordInputRef.current) === null || _passwordInputRef$cur === void 0 ? void 0 : (_passwordInputRef$cur2 = _passwordInputRef$cur.querySelector('input')) === null || _passwordInputRef$cur2 === void 0 ? void 0 : _passwordInputRef$cur2.focus();
  }, [_onParentPasswordEnter]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [isLocked ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
        address: parentAddress,
        genesisHash: parentGenesis
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Label, {
        label: t('Choose Parent Account:'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AddressDropdown.default, {
          allAddresses: allAddresses,
          onSelect: _onParentChange,
          selectedAddress: parentAddress,
          selectedGenesis: parentGenesis
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ref: passwordInputRef,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputWithLabel, {
          "data-input-password": true,
          isError: !!parentPassword && !isProperParentPassword,
          isFocused: true,
          label: t('enter the password for the account you want to derive from'),
          onChange: _onParentPasswordEnter,
          type: "password",
          value: parentPassword
        }), !!parentPassword && !isProperParentPassword && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
          isBelowInput: true,
          isDanger: true,
          children: t('Wrong password')
        })]
      }), isProperParentPassword && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DerivationPath.default, {
          defaultPath: defaultPath,
          isError: !!pathError,
          onChange: _onSuriPathChange,
          parentAddress: parentAddress,
          parentPassword: parentPassword,
          withSoftPath: allowSoftDerivation
        }), !!pathError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
          isBelowInput: true,
          isDanger: true,
          children: pathError
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.VerticalSpace, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ButtonArea, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.NextStepButton, {
        "data-button-action": "create derived account",
        isBusy: isBusy,
        isDisabled: !isProperParentPassword || !!pathError,
        onClick: _onSubmit,
        children: t('Create a derived account')
      })
    })]
  });
}