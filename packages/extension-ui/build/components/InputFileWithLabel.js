import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { createRef, useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { formatNumber, hexToU8a, isHex, u8aToString } from '@axia-js/util';
import useTranslation from "../hooks/useTranslation.js";
import Label from "./Label.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function classes(...classNames) {
  return classNames.filter(className => !!className).join(' ');
}

const BYTE_STR_0 = '0'.charCodeAt(0);
const BYTE_STR_X = 'x'.charCodeAt(0);

const NOOP = () => undefined;

function convertResult(result, convertHex) {
  const data = new Uint8Array(result); // this converts the input (if detected as hex), vai the hex conversion route

  if (convertHex && data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
    const hex = u8aToString(data);

    if (isHex(hex)) {
      return hexToU8a(hex);
    }
  }

  return data;
}

function InputFile({
  accept,
  className = '',
  clearContent,
  convertHex,
  isDisabled,
  isError = false,
  label,
  onChange,
  placeholder
}) {
  const {
    t
  } = useTranslation();
  const dropRef = /*#__PURE__*/createRef();
  const [file, setFile] = useState();

  const _onDrop = useCallback(files => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onabort = NOOP;
      reader.onerror = NOOP;

      reader.onload = ({
        target
      }) => {
        if (target && target.result) {
          const name = file.name;
          const data = convertResult(target.result, convertHex);
          onChange && onChange(data, name);
          dropRef && setFile({
            name,
            size: data.length
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, [convertHex, dropRef, onChange]);

  const dropZone = /*#__PURE__*/_jsx(Dropzone, {
    accept: accept,
    disabled: isDisabled,
    multiple: false,
    onDrop: _onDrop,
    ref: dropRef,
    children: ({
      getInputProps,
      getRootProps
    }) => /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({}, getRootProps({
      className: classes('ui--InputFile', isError ? 'error' : '', className)
    })), {}, {
      children: [/*#__PURE__*/_jsx("input", _objectSpread({}, getInputProps())), /*#__PURE__*/_jsx("em", {
        className: "label",
        children: !file || clearContent ? placeholder || t('click to select or drag and drop the file here') : placeholder || t('{{name}} ({{size}} bytes)', {
          replace: {
            name: file.name,
            size: formatNumber(file.size)
          }
        })
      })]
    }))
  });

  return label ? /*#__PURE__*/_jsx(Label, {
    label: label,
    children: dropZone
  }) : dropZone;
}

export default /*#__PURE__*/React.memo(styled(InputFile).withConfig({
  displayName: "InputFileWithLabel",
  componentId: "sc-sg29kl-0"
})(({
  isError,
  theme
}) => `
  border: 1px solid ${isError ? theme.errorBorderColor : theme.inputBorderColor};
  background: ${theme.inputBackground};
  border-radius: ${theme.borderRadius};
  color: ${isError ? theme.errorBorderColor : theme.textColor};
  font-size: 1rem;
  margin: 0.25rem 0;
  overflow-wrap: anywhere;
  padding: 0.5rem 0.75rem;

  &:hover {
    cursor: pointer;
  }
`));