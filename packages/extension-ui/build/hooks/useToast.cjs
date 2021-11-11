"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useToast;

var _react = require("react");

var _contexts = require("../components/contexts.cjs");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useToast() {
  return (0, _react.useContext)(_contexts.ToastContext);
}