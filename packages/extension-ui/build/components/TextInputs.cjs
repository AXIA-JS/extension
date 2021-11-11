"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = exports.TextArea = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const TextInput = (0, _styledComponents.css)(({
  theme,
  withError
}) => `
  background: ${theme.inputBackground};
  border-radius: ${theme.borderRadius};
  border: 1px solid ${theme.inputBorderColor};
  border-color: ${withError ? theme.errorBorderColor : theme.inputBorderColor};
  box-sizing: border-box;
  color: ${withError ? theme.errorColor : theme.textColor};
  display: block;
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize};
  height: 40px;
  outline: none;
  padding: 0.5rem 0.75rem;
  resize: none;
  width: 100%;

  &:read-only {
    background: ${theme.readonlyInputBackground};
    box-shadow: none;
    outline: none;
  }
`);

const TextArea = _styledComponents.default.textarea.withConfig({
  displayName: "TextInputs__TextArea",
  componentId: "sc-zy2lqv-0"
})(["", ""], TextInput);

exports.TextArea = TextArea;

const Input = _styledComponents.default.input.withConfig({
  displayName: "TextInputs__Input",
  componentId: "sc-zy2lqv-1"
})(["", ""], TextInput);

exports.Input = Input;