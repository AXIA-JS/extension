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

var _messaging = require("@axia-js/extension-ui/messaging");

var _index = require("../../components/index.cjs");

var _useGenesisHashOptions = _interopRequireDefault(require("../../hooks/useGenesisHashOptions.cjs"));

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SeedAndPath({
  className,
  onAccountChange,
  onNextStep
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const genesisOptions = (0, _useGenesisHashOptions.default)();
  const [address, setAddress] = (0, _react.useState)('');
  const [seed, setSeed] = (0, _react.useState)(null);
  const [path, setPath] = (0, _react.useState)(null);
  const [advanced, setAdvances] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)('');
  const [genesis, setGenesis] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    // No need to validate an empty seed
    // we have a dedicated error for this
    if (!seed) {
      onAccountChange(null);
      return;
    }

    const suri = `${seed || ''}${path || ''}`;
    (0, _messaging.validateSeed)(suri).then(validatedAccount => {
      setError('');
      setAddress(validatedAccount.address); // a spread operator here breaks tests, using Object.assign as a workaround

      const newAccount = Object.assign(validatedAccount, {
        genesis
      });
      onAccountChange(newAccount);
    }).catch(() => {
      setAddress('');
      onAccountChange(null);
      setError(path ? t('Invalid mnemonic seed or derivation path') : t('Invalid mnemonic seed'));
    });
  }, [t, seed, path, onAccountChange, genesis]);

  const _onToggleAdvanced = (0, _react.useCallback)(() => {
    setAdvances(!advanced);
  }, [advanced]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.TextAreaWithLabel, {
        className: "seedInput",
        isError: !!error,
        isFocused: true,
        label: t('existing 12 or 24-word mnemonic seed'),
        onChange: setSeed,
        rowsCount: 2,
        value: seed || ''
      }), !!error && !seed && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
        className: "seedError",
        isBelowInput: true,
        isDanger: true,
        children: t('Mnemonic needs to contain 12, 15, 18, 21, 24 words')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
        className: "genesisSelection",
        label: t('Network'),
        onChange: setGenesis,
        options: genesisOptions,
        value: genesis
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "advancedToggle",
        onClick: _onToggleAdvanced,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: advanced ? _freeSolidSvgIcons.faCaretDown : _freeSolidSvgIcons.faCaretRight
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('advanced')
        })]
      }), advanced && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputWithLabel, {
        className: "derivationPath",
        isError: !!path && !!error,
        label: t('derivation path'),
        onChange: setPath,
        value: path || ''
      }), !!error && !!seed && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Warning, {
        isDanger: true,
        children: error
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.VerticalSpace, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ButtonArea, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.NextStepButton, {
        isDisabled: !address || !!error,
        onClick: onNextStep,
        children: t('Next')
      })
    })]
  });
}

var _default = (0, _styledComponents.default)(SeedAndPath).withConfig({
  displayName: "SeedAndPath",
  componentId: "sc-181u3hg-0"
})(({
  theme
}) => `
  .advancedToggle {
    color: ${theme.textColor};
    cursor: pointer;
    line-height: ${theme.lineHeight};
    letter-spacing: 0.04em;
    opacity: 0.65;
    text-transform: uppercase;

    > span {
      font-size: ${theme.inputLabelFontSize};
      margin-left: .5rem;
      vertical-align: middle;
    }
  }

  .genesisSelection {
    margin-bottom: ${theme.fontSize};
  }

  .seedInput {
    margin-bottom: ${theme.fontSize};
    textarea {
      height: unset;
    }
  }

  .seedError {
    margin-bottom: 1rem;
  }
`);

exports.default = _default;