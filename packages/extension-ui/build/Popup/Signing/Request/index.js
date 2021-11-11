// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TypeRegistry } from '@axia-js/types';
import { decodeAddress } from '@axia-js/util-crypto';
import { AccountContext, ActionContext, Address, VerticalSpace } from "../../../components/index.js";
import { approveSignSignature } from "../../../messaging.js";
import Bytes from "../Bytes.js";
import Extrinsic from "../Extrinsic.js";
import LedgerSign from "../LedgerSign.js";
import Qr from "../Qr.js";
import SignArea from "./SignArea.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const CMD_MORTAL = 2;
export const CMD_SIGN_MESSAGE = 3; // keep it global, we can and will re-use this across requests

const registry = new TypeRegistry();

function isRawPayload(payload) {
  return !!payload.data;
}

export default function Request({
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
  const onAction = useContext(ActionContext);
  const [{
    hexBytes,
    payload
  }, setData] = useState({
    hexBytes: null,
    payload: null
  });
  const [error, setError] = useState(null);
  const {
    accounts
  } = useContext(AccountContext);
  useEffect(() => {
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

  const _onSignature = useCallback(({
    signature
  }) => approveSignSignature(signId, signature).then(() => onAction()).catch(error => {
    setError(error.message);
    console.error(error);
  }), [onAction, signId]);

  if (payload !== null) {
    const json = request.payload;
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Address, {
          address: json.address,
          genesisHash: json.genesisHash,
          isExternal: isExternal,
          isHardware: isHardware
        })
      }), isExternal && !isHardware ? /*#__PURE__*/_jsx(Qr, {
        address: json.address,
        cmd: CMD_MORTAL,
        genesisHash: json.genesisHash,
        onSignature: _onSignature,
        payload: payload
      }) : /*#__PURE__*/_jsx(Extrinsic, {
        payload: payload,
        request: json,
        url: url
      }), isHardware && /*#__PURE__*/_jsx(LedgerSign, {
        accountIndex: accountIndex || 0,
        addressOffset: addressOffset || 0,
        error: error,
        genesisHash: json.genesisHash,
        onSignature: _onSignature,
        payload: payload,
        setError: setError
      }), /*#__PURE__*/_jsx(SignArea, {
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
    const account = accounts.find(account => decodeAddress(account.address).toString() === decodeAddress(address).toString());
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Address, {
          address: address,
          isExternal: isExternal
        })
      }), isExternal && !isHardware && account !== null && account !== void 0 && account.genesisHash ? /*#__PURE__*/_jsx(Qr, {
        address: address,
        cmd: CMD_SIGN_MESSAGE,
        genesisHash: account.genesisHash,
        onSignature: _onSignature,
        payload: data
      }) : /*#__PURE__*/_jsx(Bytes, {
        bytes: data,
        url: url
      }), /*#__PURE__*/_jsx(VerticalSpace, {}), /*#__PURE__*/_jsx(SignArea, {
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