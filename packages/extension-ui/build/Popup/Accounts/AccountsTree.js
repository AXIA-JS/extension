import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
const _excluded = ["parentName", "suri"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Account from "./Account.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function AccountsTree(_ref) {
  var _account$children;

  let {
    parentName,
    suri
  } = _ref,
      account = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Account, _objectSpread(_objectSpread({}, account), {}, {
      parentName: parentName,
      suri: suri
    })), account === null || account === void 0 ? void 0 : (_account$children = account.children) === null || _account$children === void 0 ? void 0 : _account$children.map((child, index) => /*#__PURE__*/_jsx(AccountsTree, _objectSpread(_objectSpread({}, child), {}, {
      parentName: account.name
    }), `${index}:${child.address}`))]
  });
}