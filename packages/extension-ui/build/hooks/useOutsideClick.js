// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect } from 'react';
export default function useOutsideClick(ref, callback) {
  const handleClick = useCallback(e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  }, [callback, ref]);
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}