// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Icon({
  className = '',
  icon,
  onClick
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `${className} icon`,
    onClick: onClick,
    children: icon
  });
}

export default styled(Icon).withConfig({
  displayName: "Icon",
  componentId: "sc-nr7p5x-0"
})(({
  onClick
}) => `
  background: white;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: ${onClick ? 'pointer' : 'inherit'};
  text-align: center;
`);