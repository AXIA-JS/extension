"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTranslation = useTranslation;
exports.default = void 0;

var _reactI18next = require("react-i18next");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useTranslation() {
  return (0, _reactI18next.useTranslation)();
}

var _default = (0, _reactI18next.withTranslation)();

exports.default = _default;