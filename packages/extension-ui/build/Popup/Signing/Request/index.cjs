"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Request;
exports.CMD_SIGN_MESSAGE = exports.CMD_MORTAL = void 0;

var _react = _interopRequireWildcard(require("react"));

var _types = require("@axia-js/types");

var _utilCrypto = require("@axia-js/util-crypto");

var _index = require("../../../components/index.cjs");

var _messaging = require("../../../messaging.cjs");

var _Bytes = _interopRequireDefault(require("../Bytes.cjs"));

var _Extrinsic = _interopRequireDefault(require("../Extrinsic.cjs"));

var _LedgerSign = _interopRequireDefault(require("../LedgerSign.cjs"));

var _Qr = _interopRequireDefault(require("../Qr.cjs"));

var _SignArea = _interopRequireDefault(require("./SignArea.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const CMD_MORTAL = 2;
exports.CMD_MORTAL = CMD_MORTAL;
const CMD_SIGN_MESSAGE = 3; // keep it global, we can and will re-use this across requests

exports.CMD_SIGN_MESSAGE = CMD_SIGN_MESSAGE;
const registry = new _types.TypeRegistry();

function isRawPayload(payload) {
  return !!payload.data;
}

function Request({
  account: {
    accountIndex,
    addressOffset,
    isExternal,
    isHardware
  },
  buttonText,
  isFirst,
  request,
  signId,
  url
}) {
  const onAction = (0, _react.useContext)(_index.ActionContext);
  const [{
    hexBytes,
    payload
  }, setData] = (0, _react.useState)({
    hexBytes: null,
    payload: null
  });
  const [error, setError] = (0, _react.useState)(null);
  const {
    accounts
  } = (0, _react.useContext)(_index.AccountContext);
  (0, _react.useEffect)(() => {
    const payload = request.payload;

    if (isRawPayload(payload)) {
      setData({
        hexBytes: payload.data,
        payload: null
      });
    } else {
      registry.setSignedExtensions(payload.signedExtensions);
      setData({
        hexBytes: null,
        payload: registry.createType('ExtrinsicPayload', payload, {
          version: payload.version
        })
      });
    }
  }, [request]);

  const _onSignature = (0, _react.useCallback)(({
    signature
  }) => (0, _messaging.approveSignSignature)(signId, signature).then(() => onAction()).catch(error => {
    setError(error.message);
    console.error(error);
  }), [onAction, signId]);

  if (payload !== null) {
    const json = request.payload;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
          address: json.address,
          genesisHash: json.genesisHash,
          isExternal: isExternal,
          isHardware: isHardware
        })
      }), isExternal && !isHardware ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Qr.default, {
        address: json.address,
        cmd: CMD_MORTAL,
        genesisHash: json.genesisHash,
        onSignature: _onSignature,
        payload: payload
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Extrinsic.default, {
        payload: payload,
        request: json,
        url: url
      }), isHardware && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LedgerSign.default, {
        accountIndex: accountIndex || 0,
        addressOffset: addressOffset || 0,
        error: error,
        genesisHash: json.genesisHash,
        onSignature: _onSignature,
        payload: payload,
        setError: setError
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SignArea.default, {
        buttonText: buttonText,
        error: error,
        isExternal: isExternal,
        isFirst: isFirst,
        setError: setError,
        signId: signId
      })]
    });
  } else if (hexBytes !== null) {
    const {
      address,
      data
    } = request.payload;
    const account = accounts.find(account => (0, _utilCrypto.decodeAddress)(account.address).toString() === (0, _utilCrypto.decodeAddress)(address).toString());
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
          address: address,
          isExternal: isExternal
        })
      }), isExternal && !isHardware && account !== null && account !== void 0 && account.genesisHash ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Qr.default, {
        address: address,
        cmd: CMD_SIGN_MESSAGE,
        genesisHash: account.genesisHash,
        onSignature: _onSignature,
        payload: data
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bytes.default, {
        bytes: data,
        url: url
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.VerticalSpace, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SignArea.default, {
        buttonText: buttonText,
        error: error,
        isExternal: isExternal,
        isFirst: isFirst,
        setError: setError,
        signId: signId
      })]
    });
  }

  return null;
}