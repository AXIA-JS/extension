"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useOutsideClick;

var _react = require("react");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useOutsideClick(ref, callback) {
  const handleClick = (0, _react.useCallback)(e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  }, [callback, ref]);
  (0, _react.useEffect)(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}