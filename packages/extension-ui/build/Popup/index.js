// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { PHISHING_PAGE_REDIRECT } from '@axia-js/extension-base/defaults';
import { canDerive } from '@axia-js/extension-base/utils';
import uiSettings from '@axia-js/ui-settings';
import { ErrorBoundary, Loading } from "../components/index.js";
import { AccountContext, ActionContext, AuthorizeReqContext, MediaContext, MetadataReqContext, SettingsContext, SigningReqContext } from "../components/contexts.js";
import ToastProvider from "../components/Toast/ToastProvider.js";
import { subscribeAccounts, subscribeAuthorizeRequests, subscribeMetadataRequests, subscribeSigningRequests } from "../messaging.js";
import { buildHierarchy } from "../util/buildHierarchy.js";
import Accounts from "./Accounts/index.js";
import AuthList from "./AuthManagement/index.js";
import Authorize from "./Authorize/index.js";
import CreateAccount from "./CreateAccount/index.js";
import Derive from "./Derive/index.js";
import Export from "./Export.js";
import ExportAll from "./ExportAll.js";
import Forget from "./Forget.js";
import ImportLedger from "./ImportLedger.js";
import ImportQr from "./ImportQr.js";
import ImportSeed from "./ImportSeed/index.js";
import Metadata from "./Metadata/index.js";
import PhishingDetected from "./PhishingDetected.js";
import RestoreJson from "./RestoreJson.js";
import Signing from "./Signing/index.js";
import Welcome from "./Welcome.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const startSettings = uiSettings.get(); // Request permission for video, based on access we can hide/show import

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
  const hierarchy = buildHierarchy(accounts);
  const master = hierarchy.find(({
    isExternal,
    type
  }) => !isExternal && canDerive(type));
  return {
    accounts,
    hierarchy,
    master
  };
}

export default function Popup() {
  const [accounts, setAccounts] = useState(null);
  const [accountCtx, setAccountCtx] = useState({
    accounts: [],
    hierarchy: []
  });
  const [authRequests, setAuthRequests] = useState(null);
  const [cameraOn, setCameraOn] = useState(startSettings.camera === 'on');
  const [mediaAllowed, setMediaAllowed] = useState(false);
  const [metaRequests, setMetaRequests] = useState(null);
  const [signRequests, setSignRequests] = useState(null);
  const [isWelcomeDone, setWelcomeDone] = useState(false);
  const [settingsCtx, setSettingsCtx] = useState(startSettings);

  const _onAction = useCallback(to => {
    setWelcomeDone(window.localStorage.getItem('welcome_read') === 'ok');

    if (to) {
      window.location.hash = to;
    }
  }, []);

  useEffect(() => {
    Promise.all([subscribeAccounts(setAccounts), subscribeAuthorizeRequests(setAuthRequests), subscribeMetadataRequests(setMetaRequests), subscribeSigningRequests(setSignRequests)]).catch(console.error);
    uiSettings.on('change', settings => {
      setSettingsCtx(settings);
      setCameraOn(settings.camera === 'on');
    });

    _onAction(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  useEffect(() => {
    setAccountCtx(initAccountContext(accounts || []));
  }, [accounts]);
  useEffect(() => {
    requestMediaAccess(cameraOn).then(setMediaAllowed).catch(console.error);
  }, [cameraOn]);

  function wrapWithErrorBoundary(component, trigger) {
    return /*#__PURE__*/_jsx(ErrorBoundary, {
      trigger: trigger,
      children: component
    });
  }

  const Root = isWelcomeDone ? authRequests && authRequests.length ? wrapWithErrorBoundary( /*#__PURE__*/_jsx(Authorize, {}), 'authorize') : metaRequests && metaRequests.length ? wrapWithErrorBoundary( /*#__PURE__*/_jsx(Metadata, {}), 'metadata') : signRequests && signRequests.length ? wrapWithErrorBoundary( /*#__PURE__*/_jsx(Signing, {}), 'signing') : wrapWithErrorBoundary( /*#__PURE__*/_jsx(Accounts, {}), 'accounts') : wrapWithErrorBoundary( /*#__PURE__*/_jsx(Welcome, {}), 'welcome');
  return /*#__PURE__*/_jsx(Loading, {
    children: accounts && authRequests && metaRequests && signRequests && /*#__PURE__*/_jsx(ActionContext.Provider, {
      value: _onAction,
      children: /*#__PURE__*/_jsx(SettingsContext.Provider, {
        value: settingsCtx,
        children: /*#__PURE__*/_jsx(AccountContext.Provider, {
          value: accountCtx,
          children: /*#__PURE__*/_jsx(AuthorizeReqContext.Provider, {
            value: authRequests,
            children: /*#__PURE__*/_jsx(MediaContext.Provider, {
              value: cameraOn && mediaAllowed,
              children: /*#__PURE__*/_jsx(MetadataReqContext.Provider, {
                value: metaRequests,
                children: /*#__PURE__*/_jsx(SigningReqContext.Provider, {
                  value: signRequests,
                  children: /*#__PURE__*/_jsx(ToastProvider, {
                    children: /*#__PURE__*/_jsxs(Switch, {
                      children: [/*#__PURE__*/_jsx(Route, {
                        path: "/auth-list",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(AuthList, {}), 'auth-list')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/create",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(CreateAccount, {}), 'account-creation')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/forget/:address",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(Forget, {}), 'forget-address')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/export/:address",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(Export, {}), 'export-address')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/export-all",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(ExportAll, {}), 'export-all-address')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/import-ledger",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(ImportLedger, {}), 'import-ledger')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/import-qr",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(ImportQr, {}), 'import-qr')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/import-seed",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(ImportSeed, {}), 'import-seed')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/restore-json",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(RestoreJson, {}), 'restore-json')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/derive/:address/locked",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(Derive, {
                          isLocked: true
                        }), 'derived-address-locked')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: "/account/derive/:address",
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(Derive, {}), 'derive-address')
                      }), /*#__PURE__*/_jsx(Route, {
                        path: `${PHISHING_PAGE_REDIRECT}/:website`,
                        children: wrapWithErrorBoundary( /*#__PURE__*/_jsx(PhishingDetected, {}), 'phishing-page-redirect')
                      }), /*#__PURE__*/_jsx(Route, {
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