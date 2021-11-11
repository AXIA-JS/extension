"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Password;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _validators = require("../util/validators.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MIN_LENGTH = 6;

function Password({
  isFocussed,
  onChange
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const [pass1, setPass1] = (0, _react.useState)(null);
  const [pass2, setPass2] = (0, _react.useState)(null);
  const isFirstPasswordValid = (0, _react.useMemo)(() => (0, _validators.isNotShorterThan)(MIN_LENGTH, t('Password is too short')), [t]);
  const isSecondPasswordValid = (0, _react.useCallback)(firstPassword => (0, _validators.allOf)((0, _validators.isNotShorterThan)(MIN_LENGTH, t('Password is too short')), (0, _validators.isSameAs)(firstPassword, t('Passwords do not match'))), [t]);
  (0, _react.useEffect)(() => {
    onChange(pass1 && pass2 ? pass1 : null);
  }, [onChange, pass1, pass2]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ValidatedInput, {
      component: _index.InputWithLabel,
      "data-input-password": true,
      isFocused: isFocussed,
      label: t('A new password for this account'),
      onValidatedChange: setPass1,
      type: "password",
      validator: isFirstPasswordValid
    }), pass1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ValidatedInput, {
      component: _index.InputWithLabel,
      "data-input-repeat-password": true,
      label: t('Repeat password for verification'),
      onValidatedChange: setPass2,
      type: "password",
      validator: isSecondPasswordValid(pass1)
    })]
  });
}