"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _Header = _interopRequireDefault(require("../../partials/Header.cjs"));

var _AddAccountImage = _interopRequireDefault(require("./AddAccountImage.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AddAccount({
  className
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const onAction = (0, _react.useContext)(_index.ActionContext);

  const _onClick = (0, _react.useCallback)(() => onAction('/account/create'), [onAction]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
      showAdd: true,
      showSettings: true,
      text: t('Add Account')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "image",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AddAccountImage.default, {
          onClick: _onClick
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "no-accounts",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t("You currently don't have any accounts. Create your first account to get started.")
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AddAccount).withConfig({
  displayName: "AddAccount",
  componentId: "sc-92mcc7-0"
})(({
  theme
}) => `
  color: ${theme.textColor};
  height: 100%;

  h3 {
    color: ${theme.textColor};
    margin-top: 0;
    font-weight: normal;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
  }

  > .image {
    display: flex;
    justify-content: center;
  }

  > .no-accounts p {
    text-align: center;
    font-size: 16px;
    line-height: 26px;
    margin: 0 30px;
    color: ${theme.subTextColor};
  }
`));

exports.default = _default;