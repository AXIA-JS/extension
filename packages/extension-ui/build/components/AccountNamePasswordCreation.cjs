"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../partials/index.cjs");

var _index2 = require("./index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AccountNamePasswordCreation({
  buttonLabel,
  isBusy,
  onBackClick,
  onCreate,
  onNameChange
}) {
  const [name, setName] = (0, _react.useState)(null);
  const [password, setPassword] = (0, _react.useState)(null);

  const _onCreate = (0, _react.useCallback)(() => name && password && onCreate(name, password), [name, password, onCreate]);

  const _onNameChange = (0, _react.useCallback)(name => {
    onNameChange(name || '');
    setName(name);
  }, [onNameChange]);

  const _onBackClick = (0, _react.useCallback)(() => {
    _onNameChange(null);

    setPassword(null);
    onBackClick();
  }, [_onNameChange, onBackClick]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Name, {
      isFocused: true,
      onChange: _onNameChange
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Password, {
      onChange: setPassword
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.VerticalSpace, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index2.ButtonArea, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.BackButton, {
        onClick: _onBackClick
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.NextStepButton, {
        "data-button-action": "add new root",
        isBusy: isBusy,
        isDisabled: !password || !name,
        onClick: _onCreate,
        children: buttonLabel
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(AccountNamePasswordCreation);

exports.default = _default;