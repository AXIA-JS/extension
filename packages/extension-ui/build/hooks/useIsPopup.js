// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
export default function useIsPopup() {
  return useMemo(() => {
    return window.innerWidth <= 560;
  }, []);
}