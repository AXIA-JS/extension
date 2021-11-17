// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function ActionBar({
  children,
  className
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: children
  });
}

export default styled(ActionBar).withConfig({
  displayName: "ActionBar",
  componentId: "sc-jn6ukm-0"
})(["align-content:flex-end;display:flex;justify-content:space-between;padding:0.25rem;text-align:right;a{cursor:pointer;}a+a{margin-left:0.75rem;}"]);