// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Runs in the extension background, handling all keyring access

import handlers from '@axia-js/extension-base/background/handlers';
import { PORT_CONTENT, PORT_EXTENSION } from '@axia-js/extension-base/defaults';
import { AccountsStore } from '@axia-js/extension-base/stores';
import chrome from '@axia-js/extension-inject/chrome';
import keyring from '@axia-js/ui-keyring';
import { assert } from '@axia-js/util';
import { cryptoWaitReady } from '@axia-js/util-crypto';

// setup the notification (same a FF default background, white text)
// eslint-disable-next-line no-void
void chrome.browserAction.setBadgeBackgroundColor({ color: '#d90000' });

// listen to all messages and handle appropriately
chrome.runtime.onConnect.addListener((port): void => {
  // shouldn't happen, however... only listen to what we know about
  assert([PORT_CONTENT, PORT_EXTENSION].includes(port.name), `Unknown connection from ${port.name}`);

  // message and disconnect handlers
  port.onMessage.addListener((data) => handlers(data, port));
  port.onDisconnect.addListener(() => console.log(`Disconnected from ${port.name}`));
});

// initial setup
cryptoWaitReady()
  .then((): void => {
    console.log('crypto initialized');

    // load all the keyring data
    keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' });

    console.log('initialization completed');
  })
  .catch((error): void => {
    console.error('initialization failed', error);
  });
