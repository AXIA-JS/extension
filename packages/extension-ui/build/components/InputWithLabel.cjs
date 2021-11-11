"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _Label = _interopRequireDefault(require("./Label.cjs"));

var _TextInputs = require("./TextInputs.cjs");

var _Warning = _interopRequireDefault(require("./Warning.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function InputWithLabel({
  className,
  defaultValue,
  disabled,
  isError,
  isFocused,
  isReadOnly,
  label = '',
  onBlur,
  onChange,
  onEnter,
  placeholder,
  type = 'text',
  value,
  withoutMargin
}) {
  const [isCapsLock, setIsCapsLock] = (0, _react.useState)(false);
  const {
    t
  } = (0, _useTranslation.default)();

  const _checkKey = (0, _react.useCallback)(event => {
    onEnter && event.key === 'Enter' && onEnter();

    if (type === 'password') {
      if (event.getModifierState('CapsLock')) {
        setIsCapsLock(true);
      } else {
        setIsCapsLock(false);
      }
    }
  }, [onEnter, type]);

  const _onChange = (0, _react.useCallback)(({
    target: {
      value
    }
  }) => {
    onChange && onChange(value);
  }, [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Label.default, {
    className: `${className || ''} ${withoutMargin ? 'withoutMargin' : ''}`,
    label: label,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TextInputs.Input, {
      autoCapitalize: "off",
      autoCorrect: "off",
      autoFocus: isFocused,
      defaultValue: defaultValue || undefined,
      disabled: disabled,
      onBlur: onBlur,
      onChange: _onChange,
      onKeyPress: _checkKey,
      placeholder: placeholder,
      readOnly: isReadOnly,
      spellCheck: false,
      type: type,
      value: value,
      withError: isError
    }), isCapsLock && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Warning.default, {
      isBelowInput: true,
      children: t('Warning: Caps lock is on')
    })]
  });
}

var _default = (0, _styledComponents.default)(InputWithLabel).withConfig({
  displayName: "InputWithLabel",
  componentId: "sc-154anjp-0"
})(["margin-bottom:16px;&.withoutMargin{margin-bottom:0px;+ .danger{margin-top:6px;}}"]);

exports.default = _default;