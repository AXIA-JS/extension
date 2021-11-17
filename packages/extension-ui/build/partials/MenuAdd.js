// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faUsb } from '@fortawesome/free-brands-svg-icons';
import { faCodeBranch, faFileExport, faFileUpload, faKey, faPlusCircle, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { AccountContext, Link, MediaContext, Menu, MenuDivider, MenuItem } from "../components/index.js";
import useIsPopup from "../hooks/useIsPopup.js";
import { useLedger } from "../hooks/useLedger.js";
import useTranslation from "../hooks/useTranslation.js";
import { windowOpen } from "../messaging.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const jsonPath = '/account/restore-json';
const ledgerPath = '/account/import-ledger';

function MenuAdd({
  className,
  reference
}) {
  const {
    t
  } = useTranslation();
  const {
    master
  } = useContext(AccountContext);
  const mediaAllowed = useContext(MediaContext);
  const {
    isLedgerCapable,
    isLedgerEnabled
  } = useLedger();
  const isPopup = useIsPopup();

  const _openJson = useCallback(() => windowOpen(jsonPath), []);

  const _onOpenLedgerConnect = useCallback(() => windowOpen(ledgerPath), []);

  return /*#__PURE__*/_jsxs(Menu, {
    className: className,
    reference: reference,
    children: [/*#__PURE__*/_jsx(MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/_jsxs(Link, {
        to: '/account/create',
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faPlusCircle
        }), /*#__PURE__*/_jsx("span", {
          children: t('Create new account')
        })]
      })
    }), /*#__PURE__*/_jsx(MenuDivider, {}), !!master && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(MenuItem, {
        className: "menuItem",
        children: /*#__PURE__*/_jsxs(Link, {
          to: `/account/derive/${master.address}`,
          children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
            icon: faCodeBranch
          }), /*#__PURE__*/_jsx("span", {
            children: t('Derive from an account')
          })]
        })
      }), /*#__PURE__*/_jsx(MenuDivider, {})]
    }), /*#__PURE__*/_jsx(MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/_jsxs(Link, {
        to: '/account/export-all',
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faFileExport
        }), /*#__PURE__*/_jsx("span", {
          children: t('Export all accounts')
        })]
      })
    }), /*#__PURE__*/_jsx(MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/_jsxs(Link, {
        to: "/account/import-seed",
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faKey
        }), /*#__PURE__*/_jsx("span", {
          children: t('Import account from pre-existing seed')
        })]
      })
    }), /*#__PURE__*/_jsx(MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/_jsxs(Link, {
        onClick: isPopup ? _openJson : undefined,
        to: isPopup ? undefined : jsonPath,
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faFileUpload
        }), /*#__PURE__*/_jsx("span", {
          children: t('Restore account from backup JSON file')
        })]
      })
    }), /*#__PURE__*/_jsx(MenuDivider, {}), /*#__PURE__*/_jsx(MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/_jsxs(Link, {
        isDisabled: !mediaAllowed,
        title: !mediaAllowed ? t('Camera access must be first enabled in the settings') : '',
        to: "/account/import-qr",
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faQrcode
        }), /*#__PURE__*/_jsx("span", {
          children: t('Attach external QR-signer account')
        })]
      })
    }), /*#__PURE__*/_jsx(MenuItem, {
      className: "menuItem ledger",
      children: isLedgerEnabled ? /*#__PURE__*/_jsxs(Link, {
        isDisabled: !isLedgerCapable,
        title: !isLedgerCapable && t('Ledger devices can only be connected with Chrome browser') || '',
        to: ledgerPath,
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faUsb,
          rotation: 270
        }), /*#__PURE__*/_jsx("span", {
          children: t('Attach ledger account')
        })]
      }) : /*#__PURE__*/_jsxs(Link, {
        onClick: _onOpenLedgerConnect,
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faUsb,
          rotation: 270
        }), /*#__PURE__*/_jsx("span", {
          children: t('Connect Ledger device')
        })]
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(MenuAdd).withConfig({
  displayName: "MenuAdd",
  componentId: "sc-azulxc-0"
})(({
  theme
}) => `
  margin-top: 50px;
  right: 50px; // 24 + 18 + 8
  user-select: none;

  .menuItem {
    span:first-child {
      height: 20px;
      margin-right: 8px;
      opacity: 0.5;
      width: 20px;
    }

    span {
      vertical-align: middle;
    }

    .svg-inline--fa {
      color: ${theme.iconNeutralColor};
      margin-right: 0.3rem;
      width: 0.875em;
    }
  }
`));