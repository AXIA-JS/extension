"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIsMounted;

var _react = require("react");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useIsMounted() {
  const isMounted = (0, _react.useRef)(false);
  (0, _react.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted.current;
}