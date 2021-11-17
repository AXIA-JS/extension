"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeRegularSvgIcons = require("@fortawesome/free-regular-svg-icons");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _ActionText = _interopRequireDefault(require("./ActionText.cjs"));

var _TextAreaWithLabel = _interopRequireDefault(require("./TextAreaWithLabel.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function MnemonicSeed({
  className,
  onCopy,
  seed
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TextAreaWithLabel.default, {
      className: "mnemonicDisplay",
      isReadOnly: true,
      label: t('Generated 12-word mnemonic seed:'),
      value: seed
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "buttonsRow",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ActionText.default, {
        className: "copyBtn",
        "data-seed-action": "copy",
        icon: _freeRegularSvgIcons.faCopy,
        onClick: onCopy,
        text: t('Copy to clipboard')
      })
    })]
  });
}

var _default = (0, _styledComponents.default)(MnemonicSeed).withConfig({
  displayName: "MnemonicSeed",
  componentId: "sc-57zyzk-0"
})(({
  theme
}) => `
  margin-bottom: 21px;

  .buttonsRow {
    display: flex;
    flex-direction: row;

    .copyBtn {
      margin-right: 32px;
    }
  }

  .mnemonicDisplay {
    textarea {
      color: ${theme.primaryColor};
      font-size: ${theme.fontSize};
      height: unset;
      letter-spacing: -0.01em;
      line-height: ${theme.lineHeight};
      margin-bottom: 10px;
      padding: 14px;
    }
  }
`);

exports.default = _default;