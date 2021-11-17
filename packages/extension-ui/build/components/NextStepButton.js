import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
const _excluded = ["children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import Button from "./Button.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function NextStepButton(_ref) {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_jsxs(Button, _objectSpread(_objectSpread({}, props), {}, {
    children: [children, /*#__PURE__*/_jsx(FontAwesomeIcon, {
      className: "arrowRight",
      icon: faArrowRight,
      size: "sm"
    })]
  }));
}

export default styled(NextStepButton).withConfig({
  displayName: "NextStepButton",
  componentId: "sc-1fg1l8t-0"
})(({
  theme
}) => `
  .arrowRight{
    float: right;
    margin-top: 4px;
    margin-right: 1px;
    color: ${theme.buttonTextColor};
  }
`);