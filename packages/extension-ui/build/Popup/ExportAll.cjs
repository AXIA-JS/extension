"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fileSaver = require("file-saver");

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _messaging = require("../messaging.cjs");

var _index2 = require("../partials/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MIN_LENGTH = 6;

function ExportAll({
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
  const [pass, setPass] = (0, _react.useState)('');
  const [error, setError] = (0, _react.useState)('');

  const _goHome = (0, _react.useCallback)(() => onAction('/'), [onAction]);

  const onPassChange = (0, _react.useCallback)(password => {
    setPass(password);
    setError('');
  }, []);

  const _onExportAllButtonClick = (0, _react.useCallback)(() => {
    setIsBusy(true);
    (0, _messaging.exportAccounts)(accounts.map(account => account.address), pass).then(({
      exportedJson
    }) => {
      const blob = new Blob([JSON.stringify(exportedJson)], {
        type: 'application/json; charset=utf-8'
      });
      (0, _fileSaver.saveAs)(blob, `batch_exported_account_${Date.now()}.json`);
      onAction('/');
    }).catch(error => {
      console.error(error);
      setError(error.message);
      setIsBusy(false);
    });
  }, [accounts, onAction, pass]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Header, {
      showBackArrow: true,
      text: t('All account')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: className,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "actionArea",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputWithLabel, {
          "data-export-all-password": true,
          disabled: isBusy,
          isError: pass.length < MIN_LENGTH || !!error,
          label: t('password for encrypting all accounts'),
          onChange: onPassChange,
          type: "password"
        }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
          isBelowInput: true,
          isDanger: true,
          children: error
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
          className: "export-button",
          "data-export-button": true,
          isBusy: isBusy,
          isDanger: true,
          isDisabled: pass.length === 0 || !!error,
          onClick: _onExportAllButtonClick,
          children: t('I want to export all my accounts')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionBar, {
          className: "withMarginTop",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionText, {
            className: "center",
            onClick: _goHome,
            text: t('Cancel')
          })
        })]
      })
    })]
  });
}

var _default = (0, _reactRouter.withRouter)((0, _styledComponents.default)(ExportAll).withConfig({
  displayName: "ExportAll",
  componentId: "sc-ngbc5g-0"
})([".actionArea{padding:10px 24px;}.center{margin:auto;}.export-button{margin-top:6px;}.movedWarning{margin-top:8px;}.withMarginTop{margin-top:4px;}"]));

exports.default = _default;