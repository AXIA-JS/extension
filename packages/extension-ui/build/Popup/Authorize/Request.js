// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext } from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { ActionBar, ActionContext, Button, Icon, Link, Warning } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { approveAuthRequest, rejectAuthRequest } from "../../messaging.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Request({
  authId,
  className,
  isFirst,
  request: {
    origin
  },
  url
}) {
  const {
    t
  } = useTranslation();
  const onAction = useContext(ActionContext);

  const _onApprove = useCallback(() => approveAuthRequest(authId).then(() => onAction()).catch(error => console.error(error)), [authId, onAction]);

  const _onReject = useCallback(() => rejectAuthRequest(authId).then(() => onAction()).catch(error => console.error(error)), [authId, onAction]);

  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsxs("div", {
      className: "requestInfo",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "info",
        children: [/*#__PURE__*/_jsx(Icon, {
          icon: "X",
          onClick: _onReject
        }), /*#__PURE__*/_jsx("div", {
          className: "tab-info",
          children: /*#__PURE__*/_jsxs(Trans, {
            children: ["An application, self-identifying as ", /*#__PURE__*/_jsx("span", {
              className: "tab-name",
              children: origin
            }), " is requesting access from", ' ', /*#__PURE__*/_jsx("a", {
              href: url,
              rel: "noopener noreferrer",
              target: "_blank",
              children: /*#__PURE__*/_jsx("span", {
                className: "tab-url",
                children: url
              })
            }), "."]
          }, 'accessRequest')
        })]
      }), isFirst && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Warning, {
          className: "warningMargin",
          children: t('Only approve this request if you trust the application. Approving gives the application access to the addresses of your accounts.')
        }), /*#__PURE__*/_jsx(Button, {
          className: "acceptButton",
          onClick: _onApprove,
          children: t('Yes, allow this application access')
        })]
      }), /*#__PURE__*/_jsx(ActionBar, {
        className: "rejectionButton",
        children: /*#__PURE__*/_jsx(Link, {
          isDanger: true,
          onClick: _onReject,
          children: "Reject"
        })
      })]
    })
  });
}

export default styled(Request).withConfig({
  displayName: "Request",
  componentId: "sc-1pvt11z-0"
})(({
  theme
}) => `

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

  .tab-info {
    overflow: hidden;
    margin: 0.75rem 20px 0 0;
  }

  .tab-name,
  .tab-url {
    color: ${theme.textColor};
    display: inline-block;
    max-width: 20rem;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    cursor: pointer;
    text-decoration: underline;
  }

  .requestInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;
    background: ${theme.highlightedAreaBackground};
  }

  .info {
    display: flex;
    flex-direction: row;
  }

  .acceptButton {
    width: 90%;
    margin: 25px auto 0;
  }

  .warningMargin {
    margin: 24px 24px 0 1.45rem;
  }

  .rejectionButton {
    margin: 8px 0 15px 0;
    text-decoration: underline;
  }
`);