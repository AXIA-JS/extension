// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { ButtonArea, Checkbox, MnemonicSeed, NextStepButton, VerticalSpace, Warning } from "../../components/index.js";
import useToast from "../../hooks/useToast.js";
import useTranslation from "../../hooks/useTranslation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const onCopy = () => {
  const mnemonicSeedTextElement = document.querySelector('textarea');

  if (!mnemonicSeedTextElement) {
    return;
  }

  mnemonicSeedTextElement.select();
  document.execCommand('copy');
};

function Mnemonic({
  onNextStep,
  seed
}) {
  const {
    t
  } = useTranslation();
  const [isMnemonicSaved, setIsMnemonicSaved] = useState(false);
  const {
    show
  } = useToast();

  const _onCopy = useCallback(() => {
    onCopy();
    show(t('Copied'));
  }, [show, t]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(MnemonicSeed, {
      onCopy: _onCopy,
      seed: seed
    }), /*#__PURE__*/_jsx(Warning, {
      children: t("Please write down your wallet's mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your wallet. Keep it carefully to not lose your assets.")
    }), /*#__PURE__*/_jsx(VerticalSpace, {}), /*#__PURE__*/_jsx(Checkbox, {
      checked: isMnemonicSaved,
      label: t('I have saved my mnemonic seed safely.'),
      onChange: setIsMnemonicSaved
    }), /*#__PURE__*/_jsx(ButtonArea, {
      children: /*#__PURE__*/_jsx(NextStepButton, {
        isDisabled: !isMnemonicSaved,
        onClick: onNextStep,
        children: t('Next step')
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Mnemonic);