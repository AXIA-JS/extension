"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Popup;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _defaults = require("@axia-js/extension-base/defaults");

var _utils = require("@axia-js/extension-base/utils");

var _uiSettings = _interopRequireDefault(require("@axia-js/ui-settings"));

var _index = require("../components/index.cjs");

var _contexts = require("../components/contexts.cjs");

var _ToastProvider = _interopRequireDefault(require("../components/Toast/ToastProvider.cjs"));

var _messaging = require("../messaging.cjs");

var _buildHierarchy = require("../util/buildHierarchy.cjs");

var _index2 = _interopRequireDefault(require("./Accounts/index.cjs"));

var _index3 = _interopRequireDefault(require("./AuthManagement/index.cjs"));

var _index4 = _interopRequireDefault(require("./Authorize/index.cjs"));

var _index5 = _interopRequireDefault(require("./CreateAccount/index.cjs"));

var _index6 = _interopRequireDefault(require("./Derive/index.cjs"));

var _Export = _interopRequireDefault(require("./Export.cjs"));

var _ExportAll = _interopRequireDefault(require("./ExportAll.cjs"));

var _Forget = _interopRequireDefault(require("./Forget.cjs"));

var _ImportLedger = _interopRequireDefault(require("./ImportLedger.cjs"));

var _ImportQr = _interopRequireDefault(require("./ImportQr.cjs"));

var _index7 = _interopRequireDefault(require("./ImportSeed/index.cjs"));

var _index8 = _interopRequireDefault(require("./Metadata/index.cjs"));

var _PhishingDetected = _interopRequireDefault(require("./PhishingDetected.cjs"));

var _RestoreJson = _interopRequireDefault(require("./RestoreJson.cjs"));

var _index9 = _interopRequireDefault(require("./Signing/index.cjs"));

var _Welcome = _interopRequireDefault(require("./Welcome.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const startSettings = _uiSettings.default.get(); // Request permission for video, based on access we can hide/show import


async function requestMediaAccess(cameraOn) {
  if (!cameraOn) {
    return false;
  }

  try {
    await navigator.mediaDevices.getUserMedia({
      video: true
    });
    return true;
  } catch (error) {
    console.error('Permission for video declined', error.message);
  }

  return false;
}

function initAccountContext(accounts) {
  const hierarchy = (0, _buildHierarchy.buildHierarchy)(accounts);
  const master = hierarchy.find(({
    isExternal,
    type
  }) => !isExternal && (0, _utils.canDerive)(type));
  return {
    accounts,
    hierarchy,
    master
  };
}

function Popup() {
  const [accounts, setAccounts] = (0, _react.useState)(null);
  const [accountCtx, setAccountCtx] = (0, _react.useState)({
    accounts: [],
    hierarchy: []
  });
  const [authRequests, setAuthRequests] = (0, _react.useState)(null);
  const [cameraOn, setCameraOn] = (0, _react.useState)(startSettings.camera === 'on');
  const [mediaAllowed, setMediaAllowed] = (0, _react.useState)(false);
  const [metaRequests, setMetaRequests] = (0, _react.useState)(null);
  const [signRequests, setSignRequests] = (0, _react.useState)(null);
  const [isWelcomeDone, setWelcomeDone] = (0, _react.useState)(false);
  const [settingsCtx, setSettingsCtx] = (0, _react.useState)(startSettings);

  const _onAction = (0, _react.useCallback)(to => {
    setWelcomeDone(window.localStorage.getItem('welcome_read') === 'ok');

    if (to) {
      window.location.hash = to;
    }
  }, []);

  (0, _react.useEffect)(() => {
    Promise.all([(0, _messaging.subscribeAccounts)(setAccounts), (0, _messaging.subscribeAuthorizeRequests)(setAuthRequests), (0, _messaging.subscribeMetadataRequests)(setMetaRequests), (0, _messaging.subscribeSigningRequests)(setSignRequests)]).catch(console.error);

    _uiSettings.default.on('change', settings => {
      setSettingsCtx(settings);
      setCameraOn(settings.camera === 'on');
    });

    _onAction(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  (0, _react.useEffect)(() => {
    setAccountCtx(initAccountContext(accounts || []));
  }, [accounts]);
  (0, _react.useEffect)(() => {
    requestMediaAccess(cameraOn).then(setMediaAllowed).catch(console.error);
  }, [cameraOn]);

  function wrapWithErrorBoundary(component, trigger) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ErrorBoundary, {
      trigger: trigger,
      children: component
    });
  }

  const Root = isWelcomeDone ? authRequests && authRequests.length ? wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.default, {}), 'authorize') : metaRequests && metaRequests.length ? wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index8.default, {}), 'metadata') : signRequests && signRequests.length ? wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index9.default, {}), 'signing') : wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {}), 'accounts') : wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Welcome.default, {}), 'welcome');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Loading, {
    children: accounts && authRequests && metaRequests && signRequests && /*#__PURE__*/(0, _jsxRuntime.jsx)(_contexts.ActionContext.Provider, {
      value: _onAction,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_contexts.SettingsContext.Provider, {
        value: settingsCtx,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_contexts.AccountContext.Provider, {
          value: accountCtx,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_contexts.AuthorizeReqContext.Provider, {
            value: authRequests,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_contexts.MediaContext.Provider, {
              value: cameraOn && mediaAllowed,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_contexts.MetadataReqContext.Provider, {
                value: metaRequests,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_contexts.SigningReqContext.Provider, {
                  value: signRequests,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToastProvider.default, {
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/auth-list",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {}), 'auth-list')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/create",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.default, {}), 'account-creation')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/forget/:address",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Forget.default, {}), 'forget-address')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/export/:address",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Export.default, {}), 'export-address')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/export-all",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExportAll.default, {}), 'export-all-address')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/import-ledger",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_ImportLedger.default, {}), 'import-ledger')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/import-qr",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_ImportQr.default, {}), 'import-qr')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/import-seed",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index7.default, {}), 'import-seed')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/restore-json",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_RestoreJson.default, {}), 'restore-json')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/derive/:address/locked",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.default, {
                          isLocked: true
                        }), 'derived-address-locked')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: "/account/derive/:address",
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.default, {}), 'derive-address')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        path: `${_defaults.PHISHING_PAGE_REDIRECT}/:website`,
                        children: wrapWithErrorBoundary( /*#__PURE__*/(0, _jsxRuntime.jsx)(_PhishingDetected.default, {}), 'phishing-page-redirect')
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
                        exact: true,
                        path: "/",
                        children: Root
                      })]
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  });
}