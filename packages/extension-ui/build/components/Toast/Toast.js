// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Toast({
  className,
  content
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx("p", {
      className: "snackbar-content",
      children: content
    })
  });
}

export default styled(Toast).withConfig({
  displayName: "Toast",
  componentId: "sc-1h1zrbg-0"
})(["position:fixed;display:", ";height:40px;text-align:center;vertical-align:middle;line-height:7px;top:460px;left:calc(50% - 50px);&&{margin:auto;border-radius:25px;background:", ";}"], ({
  visible
}) => visible ? 'block' : 'none', ({
  theme
}) => theme.highlightedAreaBackground);