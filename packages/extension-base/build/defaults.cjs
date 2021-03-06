"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT_EXTENSION = exports.PORT_CONTENT = exports.PHISHING_PAGE_REDIRECT = exports.PASSWORD_EXPIRY_MS = exports.PASSWORD_EXPIRY_MIN = exports.ALLOWED_PATH = void 0;
// Copyright 2019-2021 @axia-js/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ALLOWED_PATH = ['/', '/account/import-ledger', '/account/restore-json'];
exports.ALLOWED_PATH = ALLOWED_PATH;
const PORT_CONTENT = 'content';
exports.PORT_CONTENT = PORT_CONTENT;
const PHISHING_PAGE_REDIRECT = '/phishing-page-detected';
exports.PHISHING_PAGE_REDIRECT = PHISHING_PAGE_REDIRECT;
const PORT_EXTENSION = 'extension';
exports.PORT_EXTENSION = PORT_EXTENSION;
const PASSWORD_EXPIRY_MIN = 15;
exports.PASSWORD_EXPIRY_MIN = PASSWORD_EXPIRY_MIN;
const PASSWORD_EXPIRY_MS = PASSWORD_EXPIRY_MIN * 60 * 1000;
exports.PASSWORD_EXPIRY_MS = PASSWORD_EXPIRY_MS;