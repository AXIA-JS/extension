"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Name;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _validators = require("../util/validators.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Name({
  address,
  className,
  isFocused,
  label,
  onBlur,
  onChange,
  value
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const {
    accounts
  } = (0, _react.useContext)(_index.AccountContext);
  const isNameValid = (0, _react.useMemo)(() => (0, _validators.isNotShorterThan)(3, t('Account name is too short')), [t]);
  const account = accounts.find(account => account.address === address);
  const startValue = value || (account === null || account === void 0 ? void 0 : account.name);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ValidatedInput, {
    className: className,
    component: _index.InputWithLabel,
    "data-input-name": true,
    defaultValue: startValue,
    isFocused: isFocused,
    label: label || t('A descriptive name for your account'),
    onBlur: onBlur,
    onEnter: onBlur,
    onValidatedChange: onChange,
    type: "text",
    validator: isNameValid
  });
}