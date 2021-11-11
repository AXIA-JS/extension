import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
const _excluded = ["className", "component", "defaultValue", "onValidatedChange", "validator"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import useIsMounted from "../hooks/useIsMounted.js";
import { Result } from "../util/validators.js";
import Warning from "./Warning.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ValidatedInput(_ref) {
  let {
    className,
    component: Input,
    defaultValue,
    onValidatedChange,
    validator
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [value, setValue] = useState(defaultValue || '');
  const [validationResult, setValidationResult] = useState(Result.ok(''));
  const isMounted = useIsMounted();
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  useEffect(() => {
    // Do not show any error on first mount
    if (!isMounted) {
      return;
    } // eslint-disable-next-line @typescript-eslint/no-floating-promises


    (async () => {
      const result = await validator(value);
      setValidationResult(result);
      onValidatedChange(Result.isOk(result) ? value : null);
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value, validator, onValidatedChange]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Input, _objectSpread(_objectSpread({}, props), {}, {
      isError: Result.isError(validationResult),
      onChange: setValue,
      value: value
    })), Result.isError(validationResult) && /*#__PURE__*/_jsx(Warning, {
      isBelowInput: true,
      isDanger: true,
      children: validationResult.error.errorDescription
    })]
  });
}

export default ValidatedInput;