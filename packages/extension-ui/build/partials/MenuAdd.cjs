"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeBrandsSvgIcons = require("@fortawesome/free-brands-svg-icons");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../components/index.cjs");

var _useIsPopup = _interopRequireDefault(require("../hooks/useIsPopup.cjs"));

var _useLedger = require("../hooks/useLedger.cjs");

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _messaging = require("../messaging.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const jsonPath = '/account/restore-json';
const ledgerPath = '/account/import-ledger';

function MenuAdd({
  className,
  reference
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const {
    master
  } = (0, _react.useContext)(_index.AccountContext);
  const mediaAllowed = (0, _react.useContext)(_index.MediaContext);
  const {
    isLedgerCapable,
    isLedgerEnabled
  } = (0, _useLedger.useLedger)();
  const isPopup = (0, _useIsPopup.default)();

  const _openJson = (0, _react.useCallback)(() => (0, _messaging.windowOpen)(jsonPath), []);

  const _onOpenLedgerConnect = (0, _react.useCallback)(() => (0, _messaging.windowOpen)(ledgerPath), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Menu, {
    className: className,
    reference: reference,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Link, {
        to: '/account/create',
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faPlusCircle
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('Create new account')
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuDivider, {}), !!master && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
        className: "menuItem",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Link, {
          to: `/account/derive/${master.address}`,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            icon: _freeSolidSvgIcons.faCodeBranch
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: t('Derive from an account')
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuDivider, {})]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Link, {
        to: '/account/export-all',
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faFileExport
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('Export all accounts')
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Link, {
        to: "/account/import-seed",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faKey
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('Import account from pre-existing seed')
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Link, {
        onClick: isPopup ? _openJson : undefined,
        to: isPopup ? undefined : jsonPath,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faFileUpload
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('Restore account from backup JSON file')
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuDivider, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "menuItem",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Link, {
        isDisabled: !mediaAllowed,
        title: !mediaAllowed ? t('Camera access must be first enabled in the settings') : '',
        to: "/account/import-qr",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faQrcode
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('Attach external QR-signer account')
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "menuItem ledger",
      children: isLedgerEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Link, {
        isDisabled: !isLedgerCapable,
        title: !isLedgerCapable && t('Ledger devices can only be connected with Chrome browser') || '',
        to: ledgerPath,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeBrandsSvgIcons.faUsb,
          rotation: 270
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('Attach ledger account')
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Link, {
        onClick: _onOpenLedgerConnect,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeBrandsSvgIcons.faUsb,
          rotation: 270
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('Connect Ledger device')
        })]
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(MenuAdd).withConfig({
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

exports.default = _default;