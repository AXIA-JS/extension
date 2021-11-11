// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, InputWithLabel } from "../../components/index.js";
import useTranslation from "../../hooks/useTranslation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function DerivationPath({
  className,
  defaultPath,
  isError,
  onChange,
  withSoftPath
}) {
  const {
    t
  } = useTranslation();
  const [path, setPath] = useState(defaultPath);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    setPath(defaultPath);
  }, [defaultPath]);

  const _onExpand = useCallback(() => setIsDisabled(!isDisabled), [isDisabled]);

  const _onChange = useCallback(newPath => {
    setPath(newPath);
    onChange(newPath);
  }, [onChange]);

  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsxs("div", {
      className: "container",
      children: [/*#__PURE__*/_jsx("div", {
        className: `pathInput ${isDisabled ? 'locked' : ''}`,
        children: /*#__PURE__*/_jsx(InputWithLabel, {
          "data-input-suri": true,
          disabled: isDisabled,
          isError: isError || !path,
          label: isDisabled ? t('Derivation Path (unlock to edit)') : t('Derivation Path'),
          onChange: _onChange,
          placeholder: withSoftPath ? t('//hard/soft') : t('//hard'),
          value: path
        })
      }), /*#__PURE__*/_jsx(Button, {
        className: "lockButton",
        onClick: _onExpand,
        children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
          className: "lockIcon",
          icon: isDisabled ? faLock : faLockOpen
        })
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(DerivationPath).withConfig({
  displayName: "DerivationPath",
  componentId: "sc-1456qp9-0"
})(({
  theme
}) => `
  > .container {
    display: flex;
    flex-direction: row;
  }

  .lockButton {
    background: none;
    height: 14px;
    margin: 36px 2px 0 10px;
    padding: 3px;
    width: 11px;

    &:not(:disabled):hover {
      background: none;
    }

    &:active, &:focus {
      outline: none;
    }

    &::-moz-focus-inner {
      border: 0;
    }
  }

  .lockIcon {
    color: ${theme.iconNeutralColor}
  }

  .pathInput {
    width: 100%;

    &.locked input {
      opacity: 50%;
    }
  }
`));