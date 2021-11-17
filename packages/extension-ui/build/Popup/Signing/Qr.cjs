"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _wrapBytes = require("@axia-js/extension-dapp/wrapBytes");

var _reactQr = require("@axia-js/react-qr");

var _index = require("../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _index2 = require("./Request/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Qr({
  address,
  className,
  cmd,
  genesisHash,
  onSignature,
  payload
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const [isScanning, setIsScanning] = (0, _react.useState)(false);
  const payloadU8a = (0, _react.useMemo)(() => {
    switch (cmd) {
      case _index2.CMD_MORTAL:
        return payload.toU8a();

      case _index2.CMD_SIGN_MESSAGE:
        return (0, _wrapBytes.wrapBytes)(payload);

      default:
        return null;
    }
  }, [cmd, payload]);

  const _onShowQr = (0, _react.useCallback)(() => setIsScanning(true), []);

  if (!payloadU8a) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: className,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "qrContainer",
        children: ["Transaction command:", cmd, " not supported."]
      })
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "qrContainer",
      children: isScanning ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQr.QrScanSignature, {
        onScan: onSignature
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQr.QrDisplayPayload, {
        address: address,
        cmd: cmd,
        genesisHash: genesisHash,
        payload: payloadU8a
      })
    }), !isScanning && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
      className: "scanButton",
      onClick: _onShowQr,
      children: t('Scan signature via camera')
    })]
  });
}

var _default = (0, _styledComponents.default)(Qr).withConfig({
  displayName: "Qr",
  componentId: "sc-19l7dra-0"
})(["height:100%;.qrContainer{margin:5px auto 10px auto;width:65%;img{border:white solid 1px;}}.scanButton{margin-bottom:8px;}"]);

exports.default = _default;