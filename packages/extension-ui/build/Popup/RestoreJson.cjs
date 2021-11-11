"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _util = require("@axia-js/util");

var _index = require("../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _messaging = require("../messaging.cjs");

var _index2 = require("../partials/index.cjs");

var _defaultType = require("../util/defaultType.cjs");

var _typeGuards = require("../util/typeGuards.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const acceptedFormats = ['application/json', 'text/plain'].join(', ');

function Upload({
  className
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const {
    accounts
  } = (0, _react.useContext)(_index.AccountContext);
  const onAction = (0, _react.useContext)(_index.ActionContext);
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [accountsInfo, setAccountsInfo] = (0, _react.useState)([]);
  const [password, setPassword] = (0, _react.useState)('');
  const [isFileError, setFileError] = (0, _react.useState)(false);
  const [requirePassword, setRequirePassword] = (0, _react.useState)(false);
  const [isPasswordError, setIsPasswordError] = (0, _react.useState)(false); // don't use the info from the file directly
  // rather use what comes from the background from jsonGetAccountInfo

  const [file, setFile] = (0, _react.useState)(undefined);
  (0, _react.useEffect)(() => {
    !accounts.length && onAction();
  }, [accounts, onAction]);

  const _onChangePass = (0, _react.useCallback)(pass => {
    setPassword(pass);
    setIsPasswordError(false);
  }, []);

  const _onChangeFile = (0, _react.useCallback)(file => {
    setAccountsInfo(() => []);
    let json;

    try {
      json = JSON.parse((0, _util.u8aToString)(file));
      setFile(json);
    } catch (e) {
      console.error(e);
      setFileError(true);
    }

    if (json === undefined) {
      return;
    }

    if ((0, _typeGuards.isKeyringPairs$Json)(json)) {
      setRequirePassword(true);
      json.accounts.forEach(account => {
        setAccountsInfo(old => [...old, {
          address: account.address,
          genesisHash: account.meta.genesisHash,
          name: account.meta.name
        }]);
      });
    } else {
      setRequirePassword(true);
      (0, _messaging.jsonGetAccountInfo)(json).then(accountInfo => setAccountsInfo(old => [...old, accountInfo])).catch(e => {
        setFileError(true);
        console.error(e);
      });
    }
  }, []);

  const _onRestore = (0, _react.useCallback)(() => {
    if (!file) {
      return;
    }

    if (requirePassword && !password) {
      return;
    }

    setIsBusy(true);
    ((0, _typeGuards.isKeyringPairs$Json)(file) ? (0, _messaging.batchRestore)(file, password) : (0, _messaging.jsonRestore)(file, password)).then(() => {
      onAction('/');
    }).catch(e => {
      console.error(e);
      setIsBusy(false);
      setIsPasswordError(true);
    });
  }, [file, onAction, password, requirePassword]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Header, {
      showBackArrow: true,
      smallMargin: true,
      text: t('Restore from JSON')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [accountsInfo.map(({
        address,
        genesisHash,
        name,
        type = _defaultType.DEFAULT_TYPE
      }, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
        address: address,
        genesisHash: genesisHash,
        name: name,
        type: type
      }, `${index}:${address}`)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputFileWithLabel, {
        accept: acceptedFormats,
        isError: isFileError,
        label: t('backup file'),
        onChange: _onChangeFile,
        withLabel: true
      }), isFileError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
        isDanger: true,
        children: t('Invalid Json file')
      }), requirePassword && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputWithLabel, {
          isError: isPasswordError,
          label: t('Password for this file'),
          onChange: _onChangePass,
          type: "password"
        }), isPasswordError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
          isBelowInput: true,
          isDanger: true,
          children: t('Unable to decode using the supplied passphrase')
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
        className: "restoreButton",
        isBusy: isBusy,
        isDisabled: isFileError || isPasswordError,
        onClick: _onRestore,
        children: t('Restore')
      })]
    })]
  });
}

var _default = (0, _styledComponents.default)(Upload).withConfig({
  displayName: "RestoreJson",
  componentId: "sc-24pez4-0"
})([".restoreButton{margin-top:16px;}"]);

exports.default = _default;