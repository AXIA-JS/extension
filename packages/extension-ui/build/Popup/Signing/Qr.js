// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { wrapBytes } from '@axia-js/extension-dapp/wrapBytes';
import { QrDisplayPayload, QrScanSignature } from '@axia-js/react-qr';
import { Button } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { CMD_MORTAL, CMD_SIGN_MESSAGE } from "./Request/index.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

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
  } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const payloadU8a = useMemo(() => {
    switch (cmd) {
      case CMD_MORTAL:
        return payload.toU8a();

      case CMD_SIGN_MESSAGE:
        return wrapBytes(payload);

      default:
        return null;
    }
  }, [cmd, payload]);

  const _onShowQr = useCallback(() => setIsScanning(true), []);

  if (!payloadU8a) {
    return /*#__PURE__*/_jsx("div", {
      className: className,
      children: /*#__PURE__*/_jsxs("div", {
        className: "qrContainer",
        children: ["Transaction command:", cmd, " not supported."]
      })
    });
  }

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      className: "qrContainer",
      children: isScanning ? /*#__PURE__*/_jsx(QrScanSignature, {
        onScan: onSignature
      }) : /*#__PURE__*/_jsx(QrDisplayPayload, {
        address: address,
        cmd: cmd,
        genesisHash: genesisHash,
        payload: payloadU8a
      })
    }), !isScanning && /*#__PURE__*/_jsx(Button, {
      className: "scanButton",
      onClick: _onShowQr,
      children: t('Scan signature via camera')
    })]
  });
}

export default styled(Qr).withConfig({
  displayName: "Qr",
  componentId: "sc-13fx8uv-0"
})(["height:100%;.qrContainer{margin:5px auto 10px auto;width:65%;img{border:white solid 1px;}}.scanButton{margin-bottom:8px;}"]);