"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("../../../../../__mocks__/chrome.cjs");

var _types = require("@axia-js/types");

var _uiKeyring = _interopRequireDefault(require("@axia-js/ui-keyring"));

var _utilCrypto = require("@axia-js/util-crypto");

var _index = require("../../stores/index.cjs");

var _Extension = _interopRequireDefault(require("./Extension.cjs"));

var _State = _interopRequireDefault(require("./State.cjs"));

var _Tabs = _interopRequireDefault(require("./Tabs.cjs"));

// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
describe('Extension', () => {
  let extension;
  let state;
  let tabs;
  const suri = 'seed sock milk update focus rotate barely fade car face mechanic mercy';
  const password = 'passw0rd';

  async function createExtension() {
    await (0, _utilCrypto.cryptoWaitReady)();

    _uiKeyring.default.loadAll({
      store: new _index.AccountsStore()
    });

    const authUrls = {};
    authUrls['localhost:3000'] = {
      count: 0,
      id: '11',
      isAllowed: true,
      origin: 'example.com',
      url: 'http://localhost:3000'
    };
    localStorage.setItem('authUrls', JSON.stringify(authUrls));
    state = new _State.default();
    tabs = new _Tabs.default(state);
    return new _Extension.default(state);
  }

  const createAccount = async () => {
    await extension.handle('id', 'pri(accounts.create.suri)', {
      name: 'parent',
      password,
      suri
    }, {});
    const {
      address
    } = await extension.handle('id', 'pri(seed.validate)', {
      suri
    }, {});
    return address;
  };

  beforeAll(async () => {
    extension = await createExtension();
  });
  test('exports account from keyring', async () => {
    const {
      pair: {
        address
      }
    } = _uiKeyring.default.addUri(suri, password);

    const result = await extension.handle('id', 'pri(accounts.export)', {
      address,
      password
    }, {});
    expect(result.exportedJson.address).toBe(address);
    expect(result.exportedJson.encoded).toBeDefined();
  });
  describe('account derivation', () => {
    let address;
    beforeEach(async () => {
      address = await createAccount();
    });
    test('pri(derivation.validate) passes for valid suri', async () => {
      const result = await extension.handle('id', 'pri(derivation.validate)', {
        parentAddress: address,
        parentPassword: password,
        suri: '//path'
      }, {});
      expect(result).toStrictEqual({
        address: '5FP3TT3EruYBNh8YM8yoxsreMx7uZv1J1zNX7fFhoC5enwmN',
        suri: '//path'
      });
    });
    test('pri(derivation.validate) throws for invalid suri', async () => {
      await expect(extension.handle('id', 'pri(derivation.validate)', {
        parentAddress: address,
        parentPassword: password,
        suri: 'invalid-path'
      }, {})).rejects.toStrictEqual(new Error('"invalid-path" is not a valid derivation path'));
    });
    test('pri(derivation.validate) throws for invalid password', async () => {
      await expect(extension.handle('id', 'pri(derivation.validate)', {
        parentAddress: address,
        parentPassword: 'invalid-password',
        suri: '//path'
      }, {})).rejects.toStrictEqual(new Error('invalid password'));
    });
    test('pri(derivation.create) adds a derived account', async () => {
      await extension.handle('id', 'pri(derivation.create)', {
        name: 'child',
        parentAddress: address,
        parentPassword: password,
        password,
        suri: '//path'
      }, {});
      expect(_uiKeyring.default.getAccounts()).toHaveLength(2);
    });
    test('pri(derivation.create) saves parent address in meta', async () => {
      var _keyring$getAccount;

      await extension.handle('id', 'pri(derivation.create)', {
        name: 'child',
        parentAddress: address,
        parentPassword: password,
        password,
        suri: '//path'
      }, {});
      expect((_keyring$getAccount = _uiKeyring.default.getAccount('5FP3TT3EruYBNh8YM8yoxsreMx7uZv1J1zNX7fFhoC5enwmN')) === null || _keyring$getAccount === void 0 ? void 0 : _keyring$getAccount.meta.parentAddress).toEqual(address);
    });
  });
  describe('account management', () => {
    let address;
    beforeEach(async () => {
      address = await createAccount();
    });
    test('pri(accounts.changePassword) changes account password', async () => {
      const newPass = 'pa55word';
      const wrongPass = 'ZZzzZZzz';
      await expect(extension.handle('id', 'pri(accounts.changePassword)', {
        address,
        newPass,
        oldPass: wrongPass
      }, {})).rejects.toStrictEqual(new Error('oldPass is invalid'));
      await expect(extension.handle('id', 'pri(accounts.changePassword)', {
        address,
        newPass,
        oldPass: password
      }, {})).resolves.toEqual(true);

      const pair = _uiKeyring.default.getPair(address);

      expect(pair.decodePkcs8(newPass)).toEqual(undefined);
      expect(() => {
        pair.decodePkcs8(password);
      }).toThrowError('Unable to decode using the supplied passphrase');
    });
  });
  describe('custom user extension', () => {
    let address, payload, pair;
    beforeEach(async () => {
      address = await createAccount();
      pair = _uiKeyring.default.getPair(address);
      pair.decodePkcs8(password);
      payload = {
        address,
        blockHash: '0xe1b1dda72998846487e4d858909d4f9a6bbd6e338e4588e5d809de16b1317b80',
        blockNumber: '0x00000393',
        era: '0x3601',
        genesisHash: '0x242a54b35e1aad38f37b884eddeb71f6f9931b02fac27bf52dfb62ef754e5e62',
        method: '0x040105fa8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a4882380100',
        nonce: '0x0000000000000000',
        signedExtensions: ['CheckSpecVersion', 'CheckTxVersion', 'CheckGenesis', 'CheckMortality', 'CheckNonce', 'CheckWeight', 'ChargeTransactionPayment'],
        specVersion: '0x00000026',
        tip: null,
        transactionVersion: '0x00000005',
        version: 4
      };
    });
    test('signs with default signed extensions', async () => {
      const registry = new _types.TypeRegistry();
      registry.setSignedExtensions(payload.signedExtensions);
      const signatureExpected = registry.createType('ExtrinsicPayload', payload, {
        version: payload.version
      }).sign(pair);
      tabs.handle('1615191860871.5', 'pub(extrinsic.sign)', payload, 'http://localhost:3000', {}).then(result => {
        expect(result === null || result === void 0 ? void 0 : result.signature).toEqual(signatureExpected.signature);
      }).catch(err => console.log(err));
      await expect(extension.handle('1615192072290.7', 'pri(signing.approve.password)', {
        id: state.allSignRequests[0].id,
        password,
        savePass: false
      }, {})).resolves.toEqual(true);
    });
    test('signs with user extensions, known types', async () => {
      const types = {};
      const userExtensions = {
        MyUserExtension: {
          extrinsic: {
            assetId: 'AssetId'
          },
          payload: {}
        }
      };
      const meta = {
        chain: 'Development',
        color: '#191a2e',
        genesisHash: '0x242a54b35e1aad38f37b884eddeb71f6f9931b02fac27bf52dfb62ef754e5e62',
        icon: '',
        specVersion: 38,
        ss58Format: 0,
        tokenDecimals: 12,
        tokenSymbol: '',
        types,
        userExtensions
      };
      state.saveMetadata(meta);
      const payload = {
        address,
        blockHash: '0xe1b1dda72998846487e4d858909d4f9a6bbd6e338e4588e5d809de16b1317b80',
        blockNumber: '0x00000393',
        era: '0x3601',
        genesisHash: '0x242a54b35e1aad38f37b884eddeb71f6f9931b02fac27bf52dfb62ef754e5e62',
        method: '0x040105fa8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a4882380100',
        nonce: '0x0000000000000000',
        signedExtensions: ['MyUserExtension'],
        specVersion: '0x00000026',
        tip: null,
        transactionVersion: '0x00000005',
        version: 4
      };
      const registry = new _types.TypeRegistry();
      registry.setSignedExtensions(payload.signedExtensions, userExtensions);
      registry.register(types);
      const signatureExpected = registry.createType('ExtrinsicPayload', payload, {
        version: payload.version
      }).sign(pair);
      tabs.handle('1615191860771.5', 'pub(extrinsic.sign)', payload, 'http://localhost:3000', {}).then(result => {
        expect(result === null || result === void 0 ? void 0 : result.signature).toEqual(signatureExpected.signature);
      }).catch(err => console.log(err));
      await expect(extension.handle('1615192062290.7', 'pri(signing.approve.password)', {
        id: state.allSignRequests[0].id,
        password,
        savePass: false
      }, {})).resolves.toEqual(true);
    });
    test('override default signed extension', async () => {
      const types = {
        FeeExchangeV1: {
          assetId: 'Compact<AssetId>',
          maxPayment: 'Compact<Balance>'
        },
        PaymentOptions: {
          feeExchange: 'FeeExchangeV1',
          tip: 'Compact<Balance>'
        }
      };
      const userExtensions = {
        ChargeTransactionPayment: {
          extrinsic: {
            transactionPayment: 'PaymentOptions'
          },
          payload: {}
        }
      };
      const meta = {
        chain: 'Development',
        color: '#191a2e',
        genesisHash: '0x242a54b35e1aad38f37b884eddeb71f6f9931b02fac27bf52dfb62ef754e5e62',
        icon: '',
        specVersion: 38,
        ss58Format: 0,
        tokenDecimals: 12,
        tokenSymbol: '',
        types,
        userExtensions
      };
      state.saveMetadata(meta);
      const registry = new _types.TypeRegistry();
      registry.setSignedExtensions(payload.signedExtensions, userExtensions);
      registry.register(types);
      const signatureExpected = registry.createType('ExtrinsicPayload', payload, {
        version: payload.version
      }).sign(pair);
      tabs.handle('1615191860771.5', 'pub(extrinsic.sign)', payload, 'http://localhost:3000', {}).then(result => {
        expect(result === null || result === void 0 ? void 0 : result.signature).toEqual(signatureExpected.signature);
      }).catch(err => console.log(err));
      await expect(extension.handle('1615192062290.7', 'pri(signing.approve.password)', {
        id: state.allSignRequests[0].id,
        password,
        savePass: false
      }, {})).resolves.toEqual(true);
    });
    test('signs with user extensions, additional types', async () => {
      const types = {
        myCustomType: {
          feeExchange: 'Compact<AssetId>',
          tip: 'Compact<Balance>'
        }
      };
      const userExtensions = {
        MyUserExtension: {
          extrinsic: {
            myCustomType: 'myCustomType'
          },
          payload: {}
        }
      };
      const meta = {
        chain: 'Development',
        color: '#191a2e',
        genesisHash: '0x242a54b35e1aad38f37b884eddeb71f6f9931b02fac27bf52dfb62ef754e5e62',
        icon: '',
        specVersion: 38,
        ss58Format: 0,
        tokenDecimals: 12,
        tokenSymbol: '',
        types,
        userExtensions
      };
      state.saveMetadata(meta);
      const payload = {
        address,
        blockHash: '0xe1b1dda72998846487e4d858909d4f9a6bbd6e338e4588e5d809de16b1317b80',
        blockNumber: '0x00000393',
        era: '0x3601',
        genesisHash: '0x242a54b35e1aad38f37b884eddeb71f6f9931b02fac27bf52dfb62ef754e5e62',
        method: '0x040105fa8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a4882380100',
        nonce: '0x0000000000000000',
        signedExtensions: ['MyUserExtension', 'CheckTxVersion', 'CheckGenesis', 'CheckMortality', 'CheckNonce', 'CheckWeight', 'ChargeTransactionPayment'],
        specVersion: '0x00000026',
        tip: null,
        transactionVersion: '0x00000005',
        version: 4
      };
      const registry = new _types.TypeRegistry();
      registry.setSignedExtensions(payload.signedExtensions, userExtensions);
      registry.register(types);
      const signatureExpected = registry.createType('ExtrinsicPayload', payload, {
        version: payload.version
      }).sign(pair);
      tabs.handle('1615191860771.5', 'pub(extrinsic.sign)', payload, 'http://localhost:3000', {}).then(result => {
        expect(result === null || result === void 0 ? void 0 : result.signature).toEqual(signatureExpected.signature);
      }).catch(err => console.log(err));
      await expect(extension.handle('1615192062290.7', 'pri(signing.approve.password)', {
        id: state.allSignRequests[0].id,
        password,
        savePass: false
      }, {})).resolves.toEqual(true);
    });
  });
});