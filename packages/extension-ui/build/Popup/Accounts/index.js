import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AccountContext } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { Header } from "../../partials/index.js";
import AccountsTree from "./AccountsTree.js";
import AddAccount from "./AddAccount.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Accounts({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    hierarchy
  } = useContext(AccountContext);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: hierarchy.length === 0 ? /*#__PURE__*/_jsx(AddAccount, {}) : /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Header, {
        showAdd: true,
        showSettings: true,
        text: t('Accounts')
      }), /*#__PURE__*/_jsx("div", {
        className: className,
        children: hierarchy.map((json, index) => /*#__PURE__*/_createElement(AccountsTree, _objectSpread(_objectSpread({}, json), {}, {
          key: `${index}:${json.address}`
        })))
      })]
    })
  });
}

export default styled(Accounts).withConfig({
  displayName: "Accounts",
  componentId: "sc-1i83wjr-0"
})(["height:calc(100vh - 2px);overflow-y:scroll;margin-top:-25px;padding-top:25px;scrollbar-width:none;&::-webkit-scrollbar{display:none;}"]);