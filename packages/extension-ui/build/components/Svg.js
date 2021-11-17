// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

const Svg = ({
  className
}) => /*#__PURE__*/_jsx("span", {
  className: className
});

export default styled(Svg).withConfig({
  displayName: "Svg",
  componentId: "sc-1g5cukp-0"
})(({
  src,
  theme
}) => `
  background: ${theme.textColor};
  display: inline-block;
  mask: url(${src});
  mask-size: cover;
`);