"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLanguageOptions;

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getLanguageOptions() {
  return [// default/native
  {
    text: 'English',
    value: 'en'
  }, {
    text: '汉语',
    value: 'zh'
  }, {
    text: 'Français',
    value: 'fr'
  }, {
    text: 'Türkce',
    value: 'tr'
  }, {
    text: 'Polski',
    value: 'pl'
  }, {
    text: 'ภาษาไทย',
    value: 'th'
  }];
}