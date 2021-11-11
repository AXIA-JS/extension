"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _messaging = require("../../messaging.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
  } = (0, _useTranslation.default)();
  const onAction = (0, _react.useContext)(_index.ActionContext);

  const _onApprove = (0, _react.useCallback)(() => (0, _messaging.approveAuthRequest)(authId).then(() => onAction()).catch(error => console.error(error)), [authId, onAction]);

  const _onReject = (0, _react.useCallback)(() => (0, _messaging.rejectAuthRequest)(authId).then(() => onAction()).catch(error => console.error(error)), [authId, onAction]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "requestInfo",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "info",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
          icon: "X",
          onClick: _onReject
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "tab-info",
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactI18next.Trans, {
            children: ["An application, self-identifying as ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "tab-name",
              children: origin
            }), " is requesting access from", ' ', /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
              href: url,
              rel: "noopener noreferrer",
              target: "_blank",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "tab-url",
                children: url
              })
            }), "."]
          }, 'accessRequest')
        })]
      }), isFirst && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
          className: "warningMargin",
          children: t('Only approve this request if you trust the application. Approving gives the application access to the addresses of your accounts.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
          className: "acceptButton",
          onClick: _onApprove,
          children: t('Yes, allow this application access')
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionBar, {
        className: "rejectionButton",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Link, {
          isDanger: true,
          onClick: _onReject,
          children: "Reject"
        })
      })]
    })
  });
}

var _default = (0, _styledComponents.default)(Request).withConfig({
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

exports.default = _default;