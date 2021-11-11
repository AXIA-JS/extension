"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../../components/index.cjs");

var _useMetadata = _interopRequireDefault(require("../../hooks/useMetadata.cjs"));

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _messaging = require("../../messaging.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Request({
  className,
  metaId,
  request,
  url
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const chain = (0, _useMetadata.default)(request.genesisHash);
  const onAction = (0, _react.useContext)(_index.ActionContext);

  const _onApprove = (0, _react.useCallback)(() => {
    (0, _messaging.approveMetaRequest)(metaId).then(() => onAction()).catch(console.error);
  }, [metaId, onAction]);

  const _onReject = (0, _react.useCallback)(() => {
    (0, _messaging.rejectMetaRequest)(metaId).then(() => onAction()).catch(console.error);
  }, [metaId, onAction]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Table, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "label",
          children: t('from')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "data",
          children: url
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "label",
          children: t('chain')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "data",
          children: request.chain
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "label",
          children: t('icon')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "data",
          children: request.icon
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "label",
          children: t('decimals')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "data",
          children: request.tokenDecimals
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "label",
          children: t('symbol')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "data",
          children: request.tokenSymbol
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "label",
          children: t('upgrade')
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
          className: "data",
          children: [chain ? chain.specVersion : t('<unknown>'), " -> ", request.specVersion]
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "requestInfo",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
        className: "requestWarning",
        children: t('This approval will add the metadata to your extension instance, allowing future requests to be decoded using this metadata.')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
        className: "btnAccept",
        onClick: _onApprove,
        children: t('Yes, do this metadata update')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionBar, {
        className: "btnReject",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Link, {
          isDanger: true,
          onClick: _onReject,
          children: t('Reject')
        })
      })]
    })]
  });
}

var _default = (0, _styledComponents.default)(Request).withConfig({
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

exports.default = _default;