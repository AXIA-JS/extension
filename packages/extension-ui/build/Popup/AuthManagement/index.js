// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputFilter } from '@axia-js/extension-ui/components';
import useTranslation from "../../hooks/useTranslation.js";
import { getAuthList, toggleAuthorization } from "../../messaging.js";
import { Header } from "../../partials/index.js";
import WebsiteEntry from "./WebsiteEntry.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function AuthManagement({
  className
}) {
  var _Object$entries;

  const {
    t
  } = useTranslation();
  const [authList, setAuthList] = useState(null);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    getAuthList().then(({
      list
    }) => setAuthList(list)).catch(e => console.error(e));
  }, []);

  const _onChangeFilter = useCallback(filter => {
    setFilter(filter);
  }, []);

  const toggleAuth = useCallback(url => {
    toggleAuthorization(url).then(({
      list
    }) => setAuthList(list)).catch(console.error);
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      showBackArrow: true,
      smallMargin: true,
      text: t('Manage Website Access')
    }), /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(InputFilter, {
        onChange: _onChangeFilter,
        placeholder: t('example.com'),
        value: filter
      }), /*#__PURE__*/_jsx("div", {
        className: className,
        children: !authList || !((_Object$entries = Object.entries(authList)) !== null && _Object$entries !== void 0 && _Object$entries.length) ? /*#__PURE__*/_jsx("div", {
          className: "empty-list",
          children: t('No website request yet!')
        }) : /*#__PURE__*/_jsx(_Fragment, {
          children: /*#__PURE__*/_jsx("div", {
            className: "website-list",
            children: Object.entries(authList).filter(([url]) => url.includes(filter)).map(([url, info]) => /*#__PURE__*/_jsx(WebsiteEntry, {
              info: info,
              toggleAuth: toggleAuth,
              url: url
            }, url))
          })
        })
      })]
    })]
  });
}

export default styled(AuthManagement).withConfig({
  displayName: "AuthManagement",
  componentId: "sc-1p8ptj8-0"
})(["height:calc(100vh - 2px);overflow-y:auto;.empty-list{text-align:center;}"]);