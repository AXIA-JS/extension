"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("../../../../../__mocks__/chrome.cjs");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _enzyme = require("enzyme");

var _events = require("events");

var _react = _interopRequireWildcard(require("react"));

var _testUtils = require("react-dom/test-utils");

var _styledComponents = require("styled-components");

var _index = require("../../components/index.cjs");

var messaging = _interopRequireWildcard(require("../../messaging.cjs"));

var MetadataCache = _interopRequireWildcard(require("../../MetadataCache.cjs"));

var _testHelpers = require("../../testHelpers.cjs");

var _Extrinsic = _interopRequireDefault(require("./Extrinsic.cjs"));

var _metadataMock = require("./metadataMock.cjs");

var _Qr = _interopRequireDefault(require("./Qr.cjs"));

var _index2 = _interopRequireDefault(require("./Request/index.cjs"));

var _TransactionIndex = _interopRequireDefault(require("./TransactionIndex.cjs"));

var _index3 = _interopRequireDefault(require("./index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
describe('Signing requests', () => {
  let wrapper;
  let onActionStub;
  let signRequests = [];
  const emitter = new _events.EventEmitter();

  function MockRequestsProvider() {
    const [requests, setRequests] = (0, _react.useState)(signRequests);
    emitter.on('request', setRequests);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.SigningReqContext.Provider, {
      value: requests,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {})
    });
  }

  const mountComponent = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    wrapper = (0, _enzyme.mount)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionContext.Provider, {
      value: onActionStub,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styledComponents.ThemeProvider, {
        theme: _index.themes.dark,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(MockRequestsProvider, {})
      })
    }));
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    wrapper.update();
  };

  const check = input => input.simulate('change', {
    target: {
      checked: true
    }
  });

  beforeEach(async () => {
    jest.spyOn(messaging, 'cancelSignRequest').mockResolvedValue(true);
    jest.spyOn(messaging, 'approveSignPassword').mockResolvedValue(true);
    jest.spyOn(messaging, 'isSignLocked').mockResolvedValue({
      isLocked: true,
      remainingTime: 0
    });
    jest.spyOn(MetadataCache, 'getSavedMeta').mockResolvedValue(_metadataMock.alphanetMetadata);
    signRequests = [{
      account: {
        address: '5D4bqjQRPgdMBK8bNvhX4tSuCtSGZS7rZjD5XH5SoKcFeKn5',
        genesisHash: null,
        isHidden: false,
        name: 'acc1',
        parentAddress: '5Ggap6soAPaP5UeNaiJsgqQwdVhhNnm6ez7Ba1w9jJ62LM2Q',
        suri: '//0',
        whenCreated: 1602001346486
      },
      id: '1607347015530.2',
      request: {
        payload: {
          address: '5D4bqjQRPgdMBK8bNvhX4tSuCtSGZS7rZjD5XH5SoKcFeKn5',
          blockHash: '0x661f57d206d4fecda0408943427d4d25436518acbff543735e7569da9db6bdd7',
          blockNumber: '0x0033fa6b',
          era: '0xb502',
          genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
          method: '0x0403c6111b239376e5e8b983dc2d2459cbb6caed64cc1d21723973d061ae0861ef690b00b04e2bde6f',
          nonce: '0x00000003',
          signedExtensions: ['CheckSpecVersion', 'CheckTxVersion', 'CheckGenesis', 'CheckMortality', 'CheckNonce', 'CheckWeight', 'ChargeTransactionPayment'],
          specVersion: '0x0000002d',
          tip: '0x00000000000000000000000000000000',
          transactionVersion: '0x00000003',
          version: 4
        },
        sign: jest.fn()
      },
      url: 'https://axia.js.org/apps/?rpc=wss%3A%2F%2Falphanet-rpc.axia.io#/accounts'
    }, {
      account: {
        address: '5Ggap6soAPaP5UeNaiJsgqQwdVhhNnm6ez7Ba1w9jJ62LM2Q',
        genesisHash: null,
        isHidden: false,
        name: 'acc 2',
        suri: '//0',
        whenCreated: 1602001346486
      },
      id: '1607356155395.3',
      request: {
        payload: {
          address: '5Ggap6soAPaP5UeNaiJsgqQwdVhhNnm6ez7Ba1w9jJ62LM2Q',
          blockHash: '0xcf69b7935b785f90b22d2b36f2227132ef9c5dd33db1dbac9ecdafac05bf9476',
          blockNumber: '0x0036269a',
          era: '0xa501',
          genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
          method: '0x0400cc4e0e2848c488896dd0a24f153070e85e3c83f6199cfc942ab6de29c56c2d7b0700d0ed902e',
          nonce: '0x00000003',
          signedExtensions: ['CheckSpecVersion', 'CheckTxVersion', 'CheckGenesis', 'CheckMortality', 'CheckNonce', 'CheckWeight', 'ChargeTransactionPayment'],
          specVersion: '0x0000002d',
          tip: '0x00000000000000000000000000000000',
          transactionVersion: '0x00000003',
          version: 4
        },
        sign: jest.fn()
      },
      url: 'https://axia.js.org/apps'
    }];
    onActionStub = jest.fn();
    await mountComponent();
  });
  describe('Switching between requests', () => {
    it('initially first request should be shown', () => {
      expect(wrapper.find(_TransactionIndex.default).text()).toBe('1/2');
      expect(wrapper.find(_index2.default).prop('signId')).toBe(signRequests[0].id);
    });
    it('only the right arrow should be active on first screen', async () => {
      expect(wrapper.find('FontAwesomeIcon.arrowLeft')).toHaveLength(1);
      expect(wrapper.find('FontAwesomeIcon.arrowLeft.active')).toHaveLength(0);
      expect(wrapper.find('FontAwesomeIcon.arrowRight.active')).toHaveLength(1);
      wrapper.find('FontAwesomeIcon.arrowLeft').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      expect(wrapper.find(_TransactionIndex.default).text()).toBe('1/2');
    });
    it('should display second request after clicking right arrow', async () => {
      wrapper.find('FontAwesomeIcon.arrowRight').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      expect(wrapper.find(_TransactionIndex.default).text()).toBe('2/2');
      expect(wrapper.find(_index2.default).prop('signId')).toBe(signRequests[1].id);
    });
    it('only the left should be active on second screen', async () => {
      wrapper.find('FontAwesomeIcon.arrowRight').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      expect(wrapper.find('FontAwesomeIcon.arrowLeft.active')).toHaveLength(1);
      expect(wrapper.find('FontAwesomeIcon.arrowRight')).toHaveLength(1);
      expect(wrapper.find('FontAwesomeIcon.arrowRight.active')).toHaveLength(0);
      expect(wrapper.find(_TransactionIndex.default).text()).toBe('2/2');
    });
    it('should display previous request after the left arrow has been clicked', async () => {
      wrapper.find('FontAwesomeIcon.arrowRight').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.find('FontAwesomeIcon.arrowLeft').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      expect(wrapper.find(_TransactionIndex.default).text()).toBe('1/2');
      expect(wrapper.find(_index2.default).prop('signId')).toBe(signRequests[0].id);
    });
  });
  describe('External account', () => {
    it('shows Qr scanner for external accounts', async () => {
      signRequests = [{
        account: {
          address: '5Cf1CGZas62RWwce3d2EPqUvSoi1txaXKd9M5w9bEFSsQtRe',
          genesisHash: null,
          isExternal: true,
          isHidden: false,
          name: 'Dave account on Signer ',
          whenCreated: 1602085704296
        },
        id: '1607357806151.5',
        request: {
          payload: {
            address: '5Cf1CGZas62RWwce3d2EPqUvSoi1txaXKd9M5w9bEFSsQtRe',
            blockHash: '0xd2f2dfb56c16af1d0faf5b454153d3199aeb6647537f4161c26a34541c591ec8',
            blockNumber: '0x00340171',
            era: '0x1503',
            genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
            method: '0x0403c6111b239376e5e8b983dc2d2459cbb6caed64cc1d21723973d061ae0861ef690b00b04e2bde6f',
            nonce: '0x00000000',
            signedExtensions: ['CheckSpecVersion', 'CheckTxVersion', 'CheckGenesis', 'CheckMortality', 'CheckNonce', 'CheckWeight', 'ChargeTransactionPayment'],
            specVersion: '0x0000002d',
            tip: '0x00000000000000000000000000000000',
            transactionVersion: '0x00000003',
            version: 4
          },
          sign: jest.fn()
        },
        url: 'https://axia.js.org/apps/?rpc=wss%3A%2F%2Falphanet-rpc.axia.io#/accounts'
      }];
      await mountComponent();
      expect(wrapper.find(_Extrinsic.default)).toHaveLength(0);
      expect(wrapper.find(_Qr.default)).toHaveLength(1);
    });
  });
  describe('Request rendering', () => {
    it('correctly displays request 1', () => {
      expect(wrapper.find(_index.Address).find('.fullAddress').text()).toBe(signRequests[0].account.address);
      expect(wrapper.find(_Extrinsic.default).find('td.data').map(el => el.text())).toEqual(['https://axia.js.org/apps/?rpc=wss%3A%2F%2Falphanet-rpc.axia.io#/accounts', 'AlphaNet', '45', '3', `balances.transferKeepAlive(dest, value)[
  "5GYQRJj3NUznYDzCduENRcocMsyxmb6tjb5xW87ZMErBe9R7",
  "123.0000 WND"
]`, 'Same as the [`transfer`] call, but with a check that the transfer will not kill the origin account.', 'mortal, valid from {{birth}} to {{death}}']);
    });
    it('correctly displays request 2', async () => {
      wrapper.find('FontAwesomeIcon.arrowRight').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      expect(wrapper.find(_index.Address).find('.fullAddress').text()).toBe(signRequests[1].account.address);
      expect(wrapper.find(_Extrinsic.default).find('td.data').map(el => el.text())).toEqual(['https://axia.js.org/apps', 'AlphaNet', '45', '3', `balances.transfer(dest, value)[
  "5Ggap6soAPaP5UeNaiJsgqQwdVhhNnm6ez7Ba1w9jJ62LM2Q",
  "200.0000 mWND"
]`, 'Transfer some liquid free balance to another account.', 'mortal, valid from {{birth}} to {{death}}']);
    });
  });
  describe('Submitting', () => {
    it('passes request id to cancel call', async () => {
      wrapper.find('.cancelButton').find('a').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      expect(messaging.cancelSignRequest).toBeCalledWith(signRequests[0].id);
    });
    it('passes request id and password to approve call', async () => {
      wrapper.find(_index.Input).simulate('change', {
        target: {
          value: 'hunter1'
        }
      });
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.find(_index.Button).find('button').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.update();
      expect(messaging.approveSignPassword).toBeCalledWith(signRequests[0].id, false, 'hunter1');
    });
    it('asks the background to cache the password when the relevant checkbox is checked', async () => {
      check(wrapper.find('input[type="checkbox"]'));
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.find(_index.Input).simulate('change', {
        target: {
          value: 'hunter1'
        }
      });
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.find(_index.Button).find('button').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.update();
      expect(messaging.approveSignPassword).toBeCalledWith(signRequests[0].id, true, 'hunter1');
    });
    it('shows an error when the password is wrong', async () => {
      // silencing the following expected console.error
      console.error = jest.fn(); // eslint-disable-next-line @typescript-eslint/require-await

      jest.spyOn(messaging, 'approveSignPassword').mockImplementation(async () => {
        throw new Error('Unable to decode using the supplied passphrase');
      });
      wrapper.find(_index.Input).simulate('change', {
        target: {
          value: 'anything'
        }
      });
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.find(_index.Button).find('button').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.update();
      expect(wrapper.find('.warning-message').first().text()).toBe('Unable to decode using the supplied passphrase');
    });
    it('when last request has been removed/cancelled, shows the previous one', async () => {
      wrapper.find('FontAwesomeIcon.arrowRight').simulate('click');
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      (0, _testUtils.act)(() => {
        emitter.emit('request', [signRequests[0]]);
      });
      await (0, _testUtils.act)(_testHelpers.flushAllPromises);
      wrapper.update();
      expect(wrapper.find(_TransactionIndex.default)).toHaveLength(0);
      expect(wrapper.find(_index2.default).prop('signId')).toBe(signRequests[0].id);
    });
  });
});