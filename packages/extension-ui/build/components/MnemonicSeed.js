// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import styled from 'styled-components';
import useTranslation from "../hooks/useTranslation.js";
import ActionText from "./ActionText.js";
import TextAreaWithLabel from "./TextAreaWithLabel.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function MnemonicSeed({
  className,
  onCopy,
  seed
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(TextAreaWithLabel, {
      className: "mnemonicDisplay",
      isReadOnly: true,
      label: t('Generated 12-word mnemonic seed:'),
      value: seed
    }), /*#__PURE__*/_jsx("div", {
      className: "buttonsRow",
      children: /*#__PURE__*/_jsx(ActionText, {
        className: "copyBtn",
        "data-seed-action": "copy",
        icon: faCopy,
        onClick: onCopy,
        text: t('Copy to clipboard')
      })
    })]
  });
}

export default styled(MnemonicSeed).withConfig({
  displayName: "MnemonicSeed",
  componentId: "sc-klm78s-0"
})(({
  theme
}) => `
  margin-bottom: 21px;

  .buttonsRow {
    display: flex;
    flex-direction: row;

    .copyBtn {
      margin-right: 32px;
    }
  }

  .mnemonicDisplay {
    textarea {
      color: ${theme.primaryColor};
      font-size: ${theme.fontSize};
      height: unset;
      letter-spacing: -0.01em;
      line-height: ${theme.lineHeight};
      margin-bottom: 10px;
      padding: 14px;
    }
  }
`);