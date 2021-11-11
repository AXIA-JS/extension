"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastContext = exports.ThemeSwitchContext = exports.SigningReqContext = exports.SettingsContext = exports.MetadataReqContext = exports.MediaContext = exports.AuthorizeReqContext = exports.ActionContext = exports.AccountContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiSettings = _interopRequireDefault(require("@axia-js/ui-settings"));

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noop = () => undefined;

const AccountContext = /*#__PURE__*/_react.default.createContext({
  accounts: [],
  hierarchy: [],
  master: undefined
});

exports.AccountContext = AccountContext;

const ActionContext = /*#__PURE__*/_react.default.createContext(noop);

exports.ActionContext = ActionContext;

const AuthorizeReqContext = /*#__PURE__*/_react.default.createContext([]);

exports.AuthorizeReqContext = AuthorizeReqContext;

const MediaContext = /*#__PURE__*/_react.default.createContext(false);

exports.MediaContext = MediaContext;

const MetadataReqContext = /*#__PURE__*/_react.default.createContext([]);

exports.MetadataReqContext = MetadataReqContext;

const SettingsContext = /*#__PURE__*/_react.default.createContext(_uiSettings.default.get());

exports.SettingsContext = SettingsContext;

const SigningReqContext = /*#__PURE__*/_react.default.createContext([]);

exports.SigningReqContext = SigningReqContext;

const ThemeSwitchContext = /*#__PURE__*/_react.default.createContext(noop);

exports.ThemeSwitchContext = ThemeSwitchContext;

const ToastContext = /*#__PURE__*/_react.default.createContext({
  show: noop
});

exports.ToastContext = ToastContext;