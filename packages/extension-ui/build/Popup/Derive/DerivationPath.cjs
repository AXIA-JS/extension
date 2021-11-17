"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function DerivationPath({
  className,
  defaultPath,
  isError,
  onChange,
  withSoftPath
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const [path, setPath] = (0, _react.useState)(defaultPath);
  const [isDisabled, setIsDisabled] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    setPath(defaultPath);
  }, [defaultPath]);

  const _onExpand = (0, _react.useCallback)(() => setIsDisabled(!isDisabled), [isDisabled]);

  const _onChange = (0, _react.useCallback)(newPath => {
    setPath(newPath);
    onChange(newPath);
  }, [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "container",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: `pathInput ${isDisabled ? 'locked' : ''}`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputWithLabel, {
          "data-input-suri": true,
          disabled: isDisabled,
          isError: isError || !path,
          label: isDisabled ? t('Derivation Path (unlock to edit)') : t('Derivation Path'),
          onChange: _onChange,
          placeholder: withSoftPath ? t('//hard/soft') : t('//hard'),
          value: path
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
        className: "lockButton",
        onClick: _onExpand,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          className: "lockIcon",
          icon: isDisabled ? _freeSolidSvgIcons.faLock : _freeSolidSvgIcons.faLockOpen
        })
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(DerivationPath).withConfig({
  displayName: "DerivationPath",
  componentId: "sc-1evmrk6-0"
})(({
  theme
}) => `
  > .container {
    display: flex;
    flex-direction: row;
  }

  .lockButton {
    background: none;
    height: 14px;
    margin: 36px 2px 0 10px;
    padding: 3px;
    width: 11px;

    &:not(:disabled):hover {
      background: none;
    }

    &:active, &:focus {
      outline: none;
    }

    &::-moz-focus-inner {
      border: 0;
    }
  }

  .lockIcon {
    color: ${theme.iconNeutralColor}
  }

  .pathInput {
    width: 100%;

    &.locked input {
      opacity: 50%;
    }
  }
`));

exports.default = _default;