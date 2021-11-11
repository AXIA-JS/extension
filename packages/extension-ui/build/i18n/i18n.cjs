"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

var _uiSettings = _interopRequireDefault(require("@axia-js/ui-settings"));

var _Backend = _interopRequireDefault(require("./Backend.cjs"));

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
_i18next.default.use(_reactI18next.initReactI18next).use(_Backend.default).init({
  backend: {},
  debug: false,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  keySeparator: false,
  lng: _uiSettings.default.i18nLang,
  load: 'languageOnly',
  nsSeparator: false,
  react: {
    wait: true
  },
  returnEmptyString: false,
  returnNull: false
}).catch(error => console.log('i18n: failure', error));

_uiSettings.default.on('change', settings => {
  _i18next.default.changeLanguage(settings.i18nLang).catch(console.error);
});

var _default = _i18next.default;
exports.default = _default;