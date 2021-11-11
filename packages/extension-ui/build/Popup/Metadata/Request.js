// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { ActionBar, ActionContext, Button, Link, Table, Warning } from "../../components/index.js";
import useMetadata from "../../hooks/useMetadata.js";
import useTranslation from "../../hooks/useTranslation.js";
import { approveMetaRequest, rejectMetaRequest } from "../../messaging.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Request({
  className,
  metaId,
  request,
  url
}) {
  const {
    t
  } = useTranslation();
  const chain = useMetadata(request.genesisHash);
  const onAction = useContext(ActionContext);

  const _onApprove = useCallback(() => {
    approveMetaRequest(metaId).then(() => onAction()).catch(console.error);
  }, [metaId, onAction]);

  const _onReject = useCallback(() => {
    rejectMetaRequest(metaId).then(() => onAction()).catch(console.error);
  }, [metaId, onAction]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs(Table, {
      children: [/*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          className: "label",
          children: t('from')
        }), /*#__PURE__*/_jsx("td", {
          className: "data",
          children: url
        })]
      }), /*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          className: "label",
          children: t('chain')
        }), /*#__PURE__*/_jsx("td", {
          className: "data",
          children: request.chain
        })]
      }), /*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          className: "label",
          children: t('icon')
        }), /*#__PURE__*/_jsx("td", {
          className: "data",
          children: request.icon
        })]
      }), /*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          className: "label",
          children: t('decimals')
        }), /*#__PURE__*/_jsx("td", {
          className: "data",
          children: request.tokenDecimals
        })]
      }), /*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          className: "label",
          children: t('symbol')
        }), /*#__PURE__*/_jsx("td", {
          className: "data",
          children: request.tokenSymbol
        })]
      }), /*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          className: "label",
          children: t('upgrade')
        }), /*#__PURE__*/_jsxs("td", {
          className: "data",
          children: [chain ? chain.specVersion : t('<unknown>'), " -> ", request.specVersion]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "requestInfo",
      children: [/*#__PURE__*/_jsx(Warning, {
        className: "requestWarning",
        children: t('This approval will add the metadata to your extension instance, allowing future requests to be decoded using this metadata.')
      }), /*#__PURE__*/_jsx(Button, {
        className: "btnAccept",
        onClick: _onApprove,
        children: t('Yes, do this metadata update')
      }), /*#__PURE__*/_jsx(ActionBar, {
        className: "btnReject",
        children: /*#__PURE__*/_jsx(Link, {
          isDanger: true,
          onClick: _onReject,
          children: t('Reject')
        })
      })]
    })]
  });
}

export default styled(Request).withConfig({
  displayName: "Request",
  componentId: "sc-1rk9wi5-0"
})(({
  theme
}) => `
  .btnAccept {
    margin: 25px auto 0;
    width: 90%;
  }

  .btnReject {
    margin: 8px 0 15px 0;
    text-decoration: underline;
  }

  .icon {
    background: ${theme.buttonBackgroundDanger};
    color: white;
    min-width: 18px;
    width: 14px;
    height: 18px;
    font-size: 10px;
    line-height: 20px;
    margin: 16px 15px 0 1.35rem;
    font-weight: 800;
    padding-left: 0.5px;
  }

  .requestInfo {
    align-items: center;
    background: ${theme.highlightedAreaBackground};
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  .requestWarning {
    margin: 24px 24px 0 1.45rem;
  }
`);