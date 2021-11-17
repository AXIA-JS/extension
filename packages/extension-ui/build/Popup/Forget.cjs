"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _messaging = require("../messaging.cjs");

var _index2 = require("../partials/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Forget({
  className,
  match: {
    params: {
      address
    }
  }
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const onAction = (0, _react.useContext)(_index.ActionContext);
  const [isBusy, setIsBusy] = (0, _react.useState)(false);

  const _goHome = (0, _react.useCallback)(() => onAction('/'), [onAction]);

  const _onClick = (0, _react.useCallback)(() => {
    setIsBusy(true);
    (0, _messaging.forgetAccount)(address).then(() => {
      setIsBusy(false);
      onAction('/');
    }).catch(error => {
      setIsBusy(false);
      console.error(error);
    });
  }, [address, onAction]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Header, {
      showBackArrow: true,
      text: t('Forget account')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: className,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Address, {
        address: address,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
          className: "movedWarning",
          children: t('You are about to remove the account. This means that you will not be able to access it via this extension anymore. If you wish to recover it, you would need to use the seed.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "actionArea",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
            isBusy: isBusy,
            isDanger: true,
            onClick: _onClick,
            children: t('I want to forget this account')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionBar, {
            className: "withMarginTop",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionText, {
              className: "center",
              onClick: _goHome,
              text: t('Cancel')
            })
          })]
        })]
      })
    })]
  });
}

var _default = (0, _reactRouter.withRouter)((0, _styledComponents.default)(Forget).withConfig({
  displayName: "Forget",
  componentId: "sc-1q3ammg-0"
})([".actionArea{padding:10px 24px;}.center{margin:auto;}.movedWarning{margin-top:8px;}.withMarginTop{margin-top:4px;}"]));

exports.default = _default;