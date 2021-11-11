"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIsPopup;

var _react = require("react");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useIsPopup() {
  return (0, _react.useMemo)(() => {
    return window.innerWidth <= 560;
  }, []);
}