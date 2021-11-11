"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../../components/index.cjs");

var _useToast = _interopRequireDefault(require("../../hooks/useToast.cjs"));

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const onCopy = () => {
  const mnemonicSeedTextElement = document.querySelector('textarea');

  if (!mnemonicSeedTextElement) {
    return;
  }

  mnemonicSeedTextElement.select();
  document.execCommand('copy');
};

function Mnemonic({
  onNextStep,
  seed
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const [isMnemonicSaved, setIsMnemonicSaved] = (0, _react.useState)(false);
  const {
    show
  } = (0, _useToast.default)();

  const _onCopy = (0, _react.useCallback)(() => {
    onCopy();
    show(t('Copied'));
  }, [show, t]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MnemonicSeed, {
      onCopy: _onCopy,
      seed: seed
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
      children: t("Please write down your wallet's mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your wallet. Keep it carefully to not lose your assets.")
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.VerticalSpace, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Checkbox, {
      checked: isMnemonicSaved,
      label: t('I have saved my mnemonic seed safely.'),
      onChange: setIsMnemonicSaved
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ButtonArea, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.NextStepButton, {
        isDisabled: !isMnemonicSaved,
        onClick: onNextStep,
        children: t('Next step')
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Mnemonic);

exports.default = _default;