// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { validateSeed } from '@axia-js/extension-ui/messaging';
import { ButtonArea, Dropdown, InputWithLabel, NextStepButton, TextAreaWithLabel, VerticalSpace, Warning } from "../../components/index.js";
import useGenesisHashOptions from "../../hooks/useGenesisHashOptions.js";
import useTranslation from "../../hooks/useTranslation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function SeedAndPath({
  className,
  onAccountChange,
  onNextStep
}) {
  const {
    t
  } = useTranslation();
  const genesisOptions = useGenesisHashOptions();
  const [address, setAddress] = useState('');
  const [seed, setSeed] = useState(null);
  const [path, setPath] = useState(null);
  const [advanced, setAdvances] = useState(false);
  const [error, setError] = useState('');
  const [genesis, setGenesis] = useState('');
  useEffect(() => {
    // No need to validate an empty seed
    // we have a dedicated error for this
    if (!seed) {
      onAccountChange(null);
      return;
    }

    const suri = `${seed || ''}${path || ''}`;
    validateSeed(suri).then(validatedAccount => {
      setError('');
      setAddress(validatedAccount.address); // a spread operator here breaks tests, using Object.assign as a workaround

      const newAccount = Object.assign(validatedAccount, {
        genesis
      });
      onAccountChange(newAccount);
    }).catch(() => {
      setAddress('');
      onAccountChange(null);
      setError(path ? t('Invalid mnemonic seed or derivation path') : t('Invalid mnemonic seed'));
    });
  }, [t, seed, path, onAccountChange, genesis]);

  const _onToggleAdvanced = useCallback(() => {
    setAdvances(!advanced);
  }, [advanced]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: className,
      children: [/*#__PURE__*/_jsx(TextAreaWithLabel, {
        className: "seedInput",
        isError: !!error,
        isFocused: true,
        label: t('existing 12 or 24-word mnemonic seed'),
        onChange: setSeed,
        rowsCount: 2,
        value: seed || ''
      }), !!error && !seed && /*#__PURE__*/_jsx(Warning, {
        className: "seedError",
        isBelowInput: true,
        isDanger: true,
        children: t('Mnemonic needs to contain 12, 15, 18, 21, 24 words')
      }), /*#__PURE__*/_jsx(Dropdown, {
        className: "genesisSelection",
        label: t('Network'),
        onChange: setGenesis,
        options: genesisOptions,
        value: genesis
      }), /*#__PURE__*/_jsxs("div", {
        className: "advancedToggle",
        onClick: _onToggleAdvanced,
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: advanced ? faCaretDown : faCaretRight
        }), /*#__PURE__*/_jsx("span", {
          children: t('advanced')
        })]
      }), advanced && /*#__PURE__*/_jsx(InputWithLabel, {
        className: "derivationPath",
        isError: !!path && !!error,
        label: t('derivation path'),
        onChange: setPath,
        value: path || ''
      }), !!error && !!seed && /*#__PURE__*/_jsx(Warning, {
        isDanger: true,
        children: error
      })]
    }), /*#__PURE__*/_jsx(VerticalSpace, {}), /*#__PURE__*/_jsx(ButtonArea, {
      children: /*#__PURE__*/_jsx(NextStepButton, {
        isDisabled: !address || !!error,
        onClick: onNextStep,
        children: t('Next')
      })
    })]
  });
}

export default styled(SeedAndPath).withConfig({
  displayName: "SeedAndPath",
  componentId: "sc-181u3hg-0"
})(({
  theme
}) => `
  .advancedToggle {
    color: ${theme.textColor};
    cursor: pointer;
    line-height: ${theme.lineHeight};
    letter-spacing: 0.04em;
    opacity: 0.65;
    text-transform: uppercase;

    > span {
      font-size: ${theme.inputLabelFontSize};
      margin-left: .5rem;
      vertical-align: middle;
    }
  }

  .genesisSelection {
    margin-bottom: ${theme.fontSize};
  }

  .seedInput {
    margin-bottom: ${theme.fontSize};
    textarea {
      height: unset;
    }
  }

  .seedError {
    margin-bottom: 1rem;
  }
`);