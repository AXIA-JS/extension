// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import uiSettings from '@axia-js/ui-settings';
import Backend from "./Backend.js";
i18next.use(initReactI18next).use(Backend).init({
  backend: {},
  debug: false,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  keySeparator: false,
  lng: uiSettings.i18nLang,
  load: 'languageOnly',
  nsSeparator: false,
  react: {
    wait: true
  },
  returnEmptyString: false,
  returnNull: false
}).catch(error => console.log('i18n: failure', error));
uiSettings.on('change', settings => {
  i18next.changeLanguage(settings.i18nLang).catch(console.error);
});
export default i18next;