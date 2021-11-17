// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faUsb } from '@fortawesome/free-brands-svg-icons';
import { faCopy, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCodeBranch, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { decodeAddress, encodeAddress } from '@axia-js/util-crypto';
import details from "../assets/details.svg";
import useMetadata from "../hooks/useMetadata.js";
import useOutsideClick from "../hooks/useOutsideClick.js";
import useToast from "../hooks/useToast.js";
import useTranslation from "../hooks/useTranslation.js";
import { showAccount } from "../messaging.js";
import { DEFAULT_TYPE } from "../util/defaultType.js";
import getParentNameSuri from "../util/getParentNameSuri.js";
import { AccountContext, SettingsContext } from "./contexts.js";
import Identicon from "./Identicon.js";
import Menu from "./Menu.js";
import Svg from "./Svg.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

// find an account in our list
function findSubstrateAccount(accounts, publicKey) {
  const pkStr = publicKey.toString();
  return accounts.find(({
    address
  }) => decodeAddress(address).toString() === pkStr) || null;
} // find an account in our list


function findAccountByAddress(accounts, _address) {
  return accounts.find(({
    address
  }) => address === _address) || null;
} // recodes an supplied address using the prefix/genesisHash, include the actual saved account & chain


function recodeAddress(address, accounts, chain, settings) {
  // decode and create a shortcut for the encoded address
  const publicKey = decodeAddress(address); // find our account using the actual publicKey, and then find the associated chain

  const account = findSubstrateAccount(accounts, publicKey);
  const prefix = chain ? chain.ss58Format : settings.prefix === -1 ? 42 : settings.prefix; // always allow the actual settings to override the display

  return {
    account,
    formatted: encodeAddress(publicKey, prefix),
    genesisHash: account === null || account === void 0 ? void 0 : account.genesisHash,
    prefix,
    type: (account === null || account === void 0 ? void 0 : account.type) || DEFAULT_TYPE
  };
}

const ACCOUNTS_SCREEN_HEIGHT = 550;
const defaultRecoded = {
  account: null,
  formatted: null,
  prefix: 42,
  type: DEFAULT_TYPE
};

function Address({
  actions,
  address,
  children,
  className,
  genesisHash,
  isExternal,
  isHardware,
  isHidden,
  name,
  parentName,
  suri,
  toggleActions,
  type: givenType
}) {
  const {
    t
  } = useTranslation();
  const {
    accounts
  } = useContext(AccountContext);
  const settings = useContext(SettingsContext);
  const [{
    account,
    formatted,
    genesisHash: recodedGenesis,
    prefix,
    type
  }, setRecoded] = useState(defaultRecoded);
  const chain = useMetadata(genesisHash || recodedGenesis, true);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [moveMenuUp, setIsMovedMenu] = useState(false);
  const actionsRef = useRef(null);
  const {
    show
  } = useToast();
  useOutsideClick(actionsRef, () => showActionsMenu && setShowActionsMenu(!showActionsMenu));
  useEffect(() => {
    if (!address) {
      setRecoded(defaultRecoded);
      return;
    }

    const accountByAddress = findAccountByAddress(accounts, address);
    const recoded = (chain === null || chain === void 0 ? void 0 : chain.definition.chainType) === 'ethereum' || (accountByAddress === null || accountByAddress === void 0 ? void 0 : accountByAddress.type) === 'ethereum' || !accountByAddress && givenType === 'ethereum' ? {
      account: accountByAddress,
      formatted: address,
      type: 'ethereum'
    } : recodeAddress(address, accounts, chain, settings);
    setRecoded(recoded || defaultRecoded);
  }, [accounts, address, chain, givenType, settings]);
  useEffect(() => {
    if (!showActionsMenu) {
      setIsMovedMenu(false);
    } else if (actionsRef.current) {
      const {
        bottom
      } = actionsRef.current.getBoundingClientRect();

      if (bottom > ACCOUNTS_SCREEN_HEIGHT) {
        setIsMovedMenu(true);
      }
    }
  }, [showActionsMenu]);
  useEffect(() => {
    setShowActionsMenu(false);
  }, [toggleActions]);
  const theme = chain !== null && chain !== void 0 && chain.icon ? chain.icon : type === 'ethereum' ? 'ethereum' : 'axia';

  const _onClick = useCallback(() => setShowActionsMenu(!showActionsMenu), [showActionsMenu]);

  const _onCopy = useCallback(() => show(t('Copied')), [show, t]);

  const _toggleVisibility = useCallback(() => {
    address && showAccount(address, isHidden || false).catch(console.error);
  }, [address, isHidden]);

  const Name = () => {
    const accountName = name || (account === null || account === void 0 ? void 0 : account.name);
    const displayName = accountName || t('<unknown>');
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [!!accountName && ((account === null || account === void 0 ? void 0 : account.isExternal) || isExternal) && (account !== null && account !== void 0 && account.isHardware || isHardware ? /*#__PURE__*/_jsx(FontAwesomeIcon, {
        className: "hardwareIcon",
        icon: faUsb,
        rotation: 270,
        title: t('hardware wallet account')
      }) : /*#__PURE__*/_jsx(FontAwesomeIcon, {
        className: "externalIcon",
        icon: faQrcode,
        title: t('external account')
      })), /*#__PURE__*/_jsx("span", {
        title: displayName,
        children: displayName
      })]
    });
  };

  const parentNameSuri = getParentNameSuri(parentName, suri);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "infoRow",
      children: [/*#__PURE__*/_jsx(Identicon, {
        className: "identityIcon",
        iconTheme: theme,
        isExternal: isExternal,
        onCopy: _onCopy,
        prefix: prefix,
        value: formatted || address
      }), /*#__PURE__*/_jsxs("div", {
        className: "info",
        children: [parentName ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsxs("div", {
            className: "banner",
            children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
              className: "deriveIcon",
              icon: faCodeBranch
            }), /*#__PURE__*/_jsx("div", {
              className: "parentName",
              "data-field": "parent",
              title: parentNameSuri,
              children: parentNameSuri
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "name displaced",
            children: /*#__PURE__*/_jsx(Name, {})
          })]
        }) : /*#__PURE__*/_jsx("div", {
          className: "name",
          "data-field": "name",
          children: /*#__PURE__*/_jsx(Name, {})
        }), (chain === null || chain === void 0 ? void 0 : chain.genesisHash) && /*#__PURE__*/_jsx("div", {
          className: "banner chain",
          "data-field": "chain",
          style: chain.definition.color ? {
            backgroundColor: chain.definition.color
          } : undefined,
          children: chain.name.replace(' Relay Chain', '')
        }), /*#__PURE__*/_jsxs("div", {
          className: "addressDisplay",
          children: [/*#__PURE__*/_jsx("div", {
            className: "fullAddress",
            "data-field": "address",
            children: formatted || address || t('<unknown>')
          }), /*#__PURE__*/_jsx(CopyToClipboard, {
            text: formatted && formatted || '',
            children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
              className: "copyIcon",
              icon: faCopy,
              onClick: _onCopy,
              size: "sm",
              title: t('copy address')
            })
          }), actions && /*#__PURE__*/_jsx(FontAwesomeIcon, {
            className: isHidden ? 'hiddenIcon' : 'visibleIcon',
            icon: isHidden ? faEyeSlash : faEye,
            onClick: _toggleVisibility,
            size: "sm",
            title: t('account visibility')
          })]
        })]
      }), actions && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("div", {
          className: "settings",
          onClick: _onClick,
          children: /*#__PURE__*/_jsx(Svg, {
            className: `detailsIcon ${showActionsMenu ? 'active' : ''}`,
            src: details
          })
        }), showActionsMenu && /*#__PURE__*/_jsx(Menu, {
          className: `movableMenu ${moveMenuUp ? 'isMoved' : ''}`,
          reference: actionsRef,
          children: actions
        })]
      })]
    }), children]
  });
}

export default styled(Address).withConfig({
  displayName: "Address",
  componentId: "sc-gt91ta-0"
})(({
  theme
}) => `
  background: ${theme.accountBackground};
  border: 1px solid ${theme.boxBorderColor};
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 8px;
  position: relative;

  .banner {
    font-size: 12px;
    line-height: 16px;
    position: absolute;
    top: 0;

    &.chain {
      background: ${theme.primaryColor};
      border-radius: 0 0 0 10px;
      color: white;
      padding: 0.1rem 0.5rem 0.1rem 0.75rem;
      right: 0;
      z-index: 1;
    }
  }

  .addressDisplay {
    display: flex;
    justify-content: space-between;
    position: relative;

    .svg-inline--fa {
      width: 14px;
      height: 14px;
      margin-right: 10px;
      color: ${theme.accountDotsIconColor};
      &:hover {
        color: ${theme.labelColor};
        cursor: pointer;
      }
    }

    .hiddenIcon, .visibleIcon {
      position: absolute;
      right: 2px;
      top: -18px;
    }

    .hiddenIcon {
      color: ${theme.errorColor};
      &:hover {
        color: ${theme.accountDotsIconColor};
      }
    }
  }

  .externalIcon, .hardwareIcon {
    margin-right: 0.3rem;
    color: ${theme.labelColor};
    width: 0.875em;
  }

  .identityIcon {
    margin-left: 15px;
    margin-right: 10px;

    & svg {
      width: 50px;
      height: 50px;
    }
  }

  .info {
    width: 100%;
  }

  .infoRow {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 72px;
    border-radius: 4px;
  }

  img {
    max-width: 50px;
    max-height: 50px;
    border-radius: 50%;
  }

  .name {
    font-size: 16px;
    line-height: 22px;
    margin: 2px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 300px;
    white-space: nowrap;

    &.displaced {
      padding-top: 10px;
    }
  }

  .parentName {
    color: ${theme.labelColor};
    font-size: ${theme.inputLabelFontSize};
    line-height: 14px;
    overflow: hidden;
    padding: 0.25rem 0 0 0.8rem;
    text-overflow: ellipsis;
    width: 270px;
    white-space: nowrap;
  }

  .fullAddress {
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${theme.labelColor};
    font-size: 12px;
    line-height: 16px;
  }

  .detailsIcon {
    background: ${theme.accountDotsIconColor};
    width: 3px;
    height: 19px;

    &.active {
      background: ${theme.primaryColor};
    }
  }

  .deriveIcon {
    color: ${theme.labelColor};
    position: absolute;
    top: 5px;
    width: 9px;
    height: 9px;
  }

  .movableMenu {
    margin-top: -20px;
    right: 28px;
    top: 0;

    &.isMoved {
      top: auto;
      bottom: 0;
    }
  }

  .settings {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 40px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 25%;
      bottom: 25%;
      width: 1px;
      background: ${theme.boxBorderColor};
    }

    &:hover {
      cursor: pointer;
      background: ${theme.readonlyInputBackground};
    }
  }
`);