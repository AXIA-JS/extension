// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { selectableNetworks } from '@axia-js/networks';
export default selectableNetworks.filter(network => network.hasLedgerSupport);