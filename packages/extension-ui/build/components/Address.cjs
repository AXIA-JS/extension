"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeBrandsSvgIcons = require("@fortawesome/free-brands-svg-icons");

var _freeRegularSvgIcons = require("@fortawesome/free-regular-svg-icons");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireWildcard(require("react"));

var _reactCopyToClipboard = _interopRequireDefault(require("react-copy-to-clipboard"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utilCrypto = require("@axia-js/util-crypto");

var _details = _interopRequireDefault(require("../assets/details.svg"));

var _useMetadata = _interopRequireDefault(require("../hooks/useMetadata.cjs"));

var _useOutsideClick = _interopRequireDefault(require("../hooks/useOutsideClick.cjs"));

var _useToast = _interopRequireDefault(require("../hooks/useToast.cjs"));

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _messaging = require("../messaging.cjs");

var _defaultType = require("../util/defaultType.cjs");

var _getParentNameSuri = _interopRequireDefault(require("../util/getParentNameSuri.cjs"));

var _contexts = require("./contexts.cjs");

var _Identicon = _interopRequireDefault(require("./Identicon.cjs"));

var _Menu = _interopRequireDefault(require("./Menu.cjs"));

var _Svg = _interopRequireDefault(require("./Svg.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// find an account in our list
function findSubstrateAccount(accounts, publicKey) {
  const pkStr = publicKey.toString();
  return accounts.find(({
    address
  }) => (0, _utilCrypto.decodeAddress)(address).toString() === pkStr) || null;
} // find an account in our list


function findAccountByAddress(accounts, _address) {
  return accounts.find(({
    address
  }) => address === _address) || null;
} // recodes an supplied address using the prefix/genesisHash, include the actual saved account & chain


function recodeAddress(address, accounts, chain, settings) {
  // decode and create a shortcut for the encoded address
  const publicKey = (0, _utilCrypto.decodeAddress)(address); // find our account using the actual publicKey, and then find the associated chain

  const account = findSubstrateAccount(accounts, publicKey);
  const prefix = chain ? chain.ss58Format : settings.prefix === -1 ? 42 : settings.prefix; // always allow the actual settings to override the display

  return {
    account,
    formatted: (0, _utilCrypto.encodeAddress)(publicKey, prefix),
    genesisHash: account === null || account === void 0 ? void 0 : account.genesisHash,
    prefix,
    type: (account === null || account === void 0 ? void 0 : account.type) || _defaultType.DEFAULT_TYPE
  };
}

const ACCOUNTS_SCREEN_HEIGHT = 550;
const defaultRecoded = {
  account: null,
  formatted: null,
  prefix: 42,
  type: _defaultType.DEFAULT_TYPE
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
  } = (0, _useTranslation.default)();
  const {
    accounts
  } = (0, _react.useContext)(_contexts.AccountContext);
  const settings = (0, _react.useContext)(_contexts.SettingsContext);
  const [{
    account,
    formatted,
    genesisHash: recodedGenesis,
    prefix,
    type
  }, setRecoded] = (0, _react.useState)(defaultRecoded);
  const chain = (0, _useMetadata.default)(genesisHash || recodedGenesis, true);
  const [showActionsMenu, setShowActionsMenu] = (0, _react.useState)(false);
  const [moveMenuUp, setIsMovedMenu] = (0, _react.useState)(false);
  const actionsRef = (0, _react.useRef)(null);
  const {
    show
  } = (0, _useToast.default)();
  (0, _useOutsideClick.default)(actionsRef, () => showActionsMenu && setShowActionsMenu(!showActionsMenu));
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
    setShowActionsMenu(false);
  }, [toggleActions]);
  const theme = chain !== null && chain !== void 0 && chain.icon ? chain.icon : type === 'ethereum' ? 'ethereum' : 'axia';

  const _onClick = (0, _react.useCallback)(() => setShowActionsMenu(!showActionsMenu), [showActionsMenu]);

  const _onCopy = (0, _react.useCallback)(() => show(t('Copied')), [show, t]);

  const _toggleVisibility = (0, _react.useCallback)(() => {
    address && (0, _messaging.showAccount)(address, isHidden || false).catch(console.error);
  }, [address, isHidden]);

  const Name = () => {
    const accountName = name || (account === null || account === void 0 ? void 0 : account.name);
    const displayName = accountName || t('<unknown>');
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [!!accountName && ((account === null || account === void 0 ? void 0 : account.isExternal) || isExternal) && (account !== null && account !== void 0 && account.isHardware || isHardware ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        className: "hardwareIcon",
        icon: _freeBrandsSvgIcons.faUsb,
        rotation: 270,
        title: t('hardware wallet account')
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        className: "externalIcon",
        icon: _freeSolidSvgIcons.faQrcode,
        title: t('external account')
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        title: displayName,
        children: displayName
      })]
    });
  };

  const parentNameSuri = (0, _getParentNameSuri.default)(parentName, suri);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "infoRow",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Identicon.default, {
        className: "identityIcon",
        iconTheme: theme,
        isExternal: isExternal,
        onCopy: _onCopy,
        prefix: prefix,
        value: formatted || address
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "info",
        children: [parentName ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "banner",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
              className: "deriveIcon",
              icon: _freeSolidSvgIcons.faCodeBranch
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "parentName",
              "data-field": "parent",
              title: parentNameSuri,
              children: parentNameSuri
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "name displaced",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Name, {})
          })]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "name",
          "data-field": "name",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Name, {})
        }), (chain === null || chain === void 0 ? void 0 : chain.genesisHash) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "banner chain",
          "data-field": "chain",
          style: chain.definition.color ? {
            backgroundColor: chain.definition.color
          } : undefined,
          children: chain.name.replace(' Relay Chain', '')
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "addressDisplay",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "fullAddress",
            "data-field": "address",
            children: formatted || address || t('<unknown>')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactCopyToClipboard.default, {
            text: formatted && formatted || '',
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
              className: "copyIcon",
              icon: _freeRegularSvgIcons.faCopy,
              onClick: _onCopy,
              size: "sm",
              title: t('copy address')
            })
          }), actions && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            className: isHidden ? 'hiddenIcon' : 'visibleIcon',
            icon: isHidden ? _freeRegularSvgIcons.faEyeSlash : _freeRegularSvgIcons.faEye,
            onClick: _toggleVisibility,
            size: "sm",
            title: t('account visibility')
          })]
        })]
      }), actions && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "settings",
          onClick: _onClick,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
            className: `detailsIcon ${showActionsMenu ? 'active' : ''}`,
            src: _details.default
          })
        }), showActionsMenu && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Menu.default, {
          className: `movableMenu ${moveMenuUp ? 'isMoved' : ''}`,
          reference: actionsRef,
          children: actions
        })]
      })]
    }), children]
  });
}

var _default = (0, _styledComponents.default)(Address).withConfig({
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

exports.default = _default;