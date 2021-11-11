// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Link({
  children,
  className = '',
  isDisabled,
  onClick,
  title,
  to
}) {
  if (isDisabled) {
    return /*#__PURE__*/_jsx("div", {
      className: `${className} isDisabled`,
      title: title,
      children: children
    });
  }

  return to ? /*#__PURE__*/_jsx(RouterLink, {
    className: className,
    onClick: onClick,
    title: title,
    to: to,
    children: children
  }) : /*#__PURE__*/_jsx("a", {
    className: className,
    href: "#",
    onClick: onClick,
    title: title,
    children: children
  });
}

export default styled(Link).withConfig({
  displayName: "Link",
  componentId: "sc-1u6j2ys-0"
})(({
  isDanger,
  theme
}) => `
  align-items: center;
  color: ${isDanger ? theme.textColorDanger : theme.textColor};
  display: flex;
  opacity: 0.85;
  text-decoration: none;
  vertical-align: middle;

  &:hover {
    color: ${isDanger ? theme.textColorDanger : theme.textColor};
    opacity: 1.0;
  }

  &:visited {
    color: ${isDanger ? theme.textColorDanger : theme.textColor};
  }

  &.isDisabled {
    opacity: 0.4;
  }
`);