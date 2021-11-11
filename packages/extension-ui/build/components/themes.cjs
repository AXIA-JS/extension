"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chooseTheme = chooseTheme;
exports.themes = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const darkTheme = {
  accountBackground: '#1A1B20',
  accountDotsIconColor: '#8E8E8E',
  addAccountImageBackground: '#1A1B20',
  backButtonBackground: '#3A3B41',
  backButtonBackgroundHover: '#3a3b41ad',
  backButtonTextColor: '#FFFFFF',
  background: '#26272C',
  bodyColor: '#20222A',
  borderRadius: '4px',
  boxBorderColor: '#303030',
  boxMargin: '0.75rem 0',
  boxPadding: '0 0.25rem',
  boxShadow: 'rgba(0, 0, 0, 0.86)',
  buttonBackground: '#E86F00',
  buttonBackgroundDanger: '#AF1111',
  buttonBackgroundDangerHover: '#D93B3B',
  buttonBackgroundHover: '#ED9329',
  buttonTextColor: '#FFFFFF',
  errorBorderColor: '#7E3530',
  errorColor: '#E42F2F',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '16px',
  highlightedAreaBackground: '#212226',
  iconDangerColor: '#AF1111',
  iconNeutralColor: '#8E8E8E',
  iconWarningColor: '#FF7D01',
  id: 'dark',
  identiconBackground: '#F4F5F8',
  inputBackground: '#111218',
  inputBorderColor: '#43444B',
  inputLabelFontSize: '10px',
  labelColor: '#9F9E99',
  labelFontSize: '13px',
  labelLineHeight: '18px',
  lineHeight: '26px',
  parentLabelColor: '#4A7463',
  popupBackground: '#38393F',
  primaryColor: '#FF7D01',
  readonlyInputBackground: '#1A1B20',
  subTextColor: '#DDD',
  textColor: '#FFFFFF',
  textColorDanger: '#FF8686'
};

const lightTheme = _objectSpread(_objectSpread({}, darkTheme), {}, {
  accountBackground: '#FFFFFF',
  addAccountImageBackground: '#FFF',
  backButtonBackground: '#D7D7D7',
  backButtonBackgroundHover: '#d7d7d7ad',
  backButtonTextColor: '#454545',
  background: '#FAFAFA',
  bodyColor: '#FFFFFF',
  boxBorderColor: '#DADFEA',
  boxShadow: 'rgba(0, 0, 0, 0.3)',
  buttonBackgroundDanger: '#DC2222',
  errorBorderColor: '#E42F2F',
  highlightedAreaBackground: '#EFEFEF',
  iconDangerColor: '#DC2222',
  iconNeutralColor: '#939CB1',
  id: 'light',
  inputBackground: '#FFFFFF',
  inputBorderColor: '#DDE1EB',
  labelColor: '#333333',
  parentLabelColor: '#215B4F',
  popupBackground: '#FFFFFF',
  readonlyInputBackground: '#FFF',
  subTextColor: '#454545',
  textColor: '#242529',
  textColorDanger: '#F24A4A'
});

const themes = {
  dark: darkTheme,
  light: lightTheme
};
exports.themes = themes;

function chooseTheme() {
  const preferredTheme = localStorage.getItem('theme');

  if (preferredTheme) {
    return preferredTheme === 'dark' ? 'dark' : 'light';
  }

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}