// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { u8aToString } from '@axia-js/util';
import { AccountContext, ActionContext, Address, Button, InputFileWithLabel, InputWithLabel, Warning } from "../components/index.js";
import useTranslation from "../hooks/useTranslation.js";
import { batchRestore, jsonGetAccountInfo, jsonRestore } from "../messaging.js";
import { Header } from "../partials/index.js";
import { DEFAULT_TYPE } from "../util/defaultType.js";
import { isKeyringPairs$Json } from "../util/typeGuards.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const acceptedFormats = ['application/json', 'text/plain'].join(', ');

function Upload({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    accounts
  } = useContext(AccountContext);
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const [accountsInfo, setAccountsInfo] = useState([]);
  const [password, setPassword] = useState('');
  const [isFileError, setFileError] = useState(false);
  const [requirePassword, setRequirePassword] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false); // don't use the info from the file directly
  // rather use what comes from the background from jsonGetAccountInfo

  const [file, setFile] = useState(undefined);
  useEffect(() => {
    !accounts.length && onAction();
  }, [accounts, onAction]);

  const _onChangePass = useCallback(pass => {
    setPassword(pass);
    setIsPasswordError(false);
  }, []);

  const _onChangeFile = useCallback(file => {
    setAccountsInfo(() => []);
    let json;

    try {
      json = JSON.parse(u8aToString(file));
      setFile(json);
    } catch (e) {
      console.error(e);
      setFileError(true);
    }

    if (json === undefined) {
      return;
    }

    if (isKeyringPairs$Json(json)) {
      setRequirePassword(true);
      json.accounts.forEach(account => {
        setAccountsInfo(old => [...old, {
          address: account.address,
          genesisHash: account.meta.genesisHash,
          name: account.meta.name
        }]);
      });
    } else {
      setRequirePassword(true);
      jsonGetAccountInfo(json).then(accountInfo => setAccountsInfo(old => [...old, accountInfo])).catch(e => {
        setFileError(true);
        console.error(e);
      });
    }
  }, []);

  const _onRestore = useCallback(() => {
    if (!file) {
      return;
    }

    if (requirePassword && !password) {
      return;
    }

    setIsBusy(true);
    (isKeyringPairs$Json(file) ? batchRestore(file, password) : jsonRestore(file, password)).then(() => {
      onAction('/');
    }).catch(e => {
      console.error(e);
      setIsBusy(false);
      setIsPasswordError(true);
    });
  }, [file, onAction, password, requirePassword]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      showBackArrow: true,
      smallMargin: true,
      text: t('Restore from JSON')
    }), /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [accountsInfo.map(({
        address,
        genesisHash,
        name,
        type = DEFAULT_TYPE
      }, index) => /*#__PURE__*/_jsx(Address, {
        address: address,
        genesisHash: genesisHash,
        name: name,
        type: type
      }, `${index}:${address}`)), /*#__PURE__*/_jsx(InputFileWithLabel, {
        accept: acceptedFormats,
        isError: isFileError,
        label: t('backup file'),
        onChange: _onChangeFile,
        withLabel: true
      }), isFileError && /*#__PURE__*/_jsx(Warning, {
        isDanger: true,
        children: t('Invalid Json file')
      }), requirePassword && /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(InputWithLabel, {
          isError: isPasswordError,
          label: t('Password for this file'),
          onChange: _onChangePass,
          type: "password"
        }), isPasswordError && /*#__PURE__*/_jsx(Warning, {
          isBelowInput: true,
          isDanger: true,
          children: t('Unable to decode using the supplied passphrase')
        })]
      }), /*#__PURE__*/_jsx(Button, {
        className: "restoreButton",
        isBusy: isBusy,
        isDisabled: isFileError || isPasswordError,
        onClick: _onRestore,
        children: t('Restore')
      })]
    })]
  });
}

export default styled(Upload).withConfig({
  displayName: "RestoreJson",
  componentId: "sc-trk9om-0"
})([".restoreButton{margin-top:16px;}"]);