// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useTranslation as useTranslationBase, withTranslation } from 'react-i18next';
export function useTranslation() {
  return useTranslationBase();
}
export default withTranslation();