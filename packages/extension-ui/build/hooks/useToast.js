// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import { ToastContext } from "../components/contexts.js";
export default function useToast() {
  return useContext(ToastContext);
}