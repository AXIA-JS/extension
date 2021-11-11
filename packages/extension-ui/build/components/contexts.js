// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import settings from '@axia-js/ui-settings'; // eslint-disable-next-line @typescript-eslint/no-unused-vars

const noop = () => undefined;

const AccountContext = /*#__PURE__*/React.createContext({
  accounts: [],
  hierarchy: [],
  master: undefined
});
const ActionContext = /*#__PURE__*/React.createContext(noop);
const AuthorizeReqContext = /*#__PURE__*/React.createContext([]);
const MediaContext = /*#__PURE__*/React.createContext(false);
const MetadataReqContext = /*#__PURE__*/React.createContext([]);
const SettingsContext = /*#__PURE__*/React.createContext(settings.get());
const SigningReqContext = /*#__PURE__*/React.createContext([]);
const ThemeSwitchContext = /*#__PURE__*/React.createContext(noop);
const ToastContext = /*#__PURE__*/React.createContext({
  show: noop
});
export { AccountContext, ActionContext, AuthorizeReqContext, MediaContext, MetadataReqContext, SettingsContext, SigningReqContext, ThemeSwitchContext, ToastContext };