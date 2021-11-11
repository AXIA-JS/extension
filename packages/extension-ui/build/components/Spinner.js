// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import spinnerSrc from "../assets/spinner.png";
import { jsx as _jsx } from "react/jsx-runtime";

function Spinner({
  className = '',
  size = 'normal'
}) {
  return /*#__PURE__*/_jsx("img", {
    className: `${className} ${size}Size`,
    src: spinnerSrc
  });
}

export default /*#__PURE__*/React.memo(styled(Spinner).withConfig({
  displayName: "Spinner",
  componentId: "sc-1csqilc-0"
})(["bottom:0rem;height:3rem;left:50%;margin-left:-1.5rem;position:absolute;width:3rem;z-index:"]));