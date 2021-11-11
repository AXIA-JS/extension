// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PASSWORD_EXPIRY_MIN } from '@axia-js/extension-base/defaults';
import { ActionBar, ActionContext, Button, ButtonArea, Checkbox, Link } from "../../../components/index.js";
import useTranslation from "../../../hooks/useTranslation.js";
import { approveSignPassword, cancelSignRequest, isSignLocked } from "../../../messaging.js";
import Unlock from "../Unlock.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SignArea({
  buttonText,
  className,
  error,
  isExternal,
  isFirst,
  setError,
  signId
}) {
  const [savePass, setSavePass] = useState(false);
  const [isLocked, setIsLocked] = useState(null);
  const [password, setPassword] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const onAction = useContext(ActionContext);
  const {
    t
  } = useTranslation();
  useEffect(() => {
    setIsLocked(null);
    let timeout;
    !isExternal && isSignLocked(signId).then(({
      isLocked,
      remainingTime
    }) => {
      setIsLocked(isLocked);
      timeout = setTimeout(() => {
        setIsLocked(true);
      }, remainingTime); // if the account was unlocked check the remember me
      // automatically to prolong the unlock period

      !isLocked && setSavePass(true);
    }).catch(error => console.error(error));
    return () => {
      !!timeout && clearTimeout(timeout);
    };
  }, [isExternal, signId]);

  const _onSign = useCallback(() => {
    setIsBusy(true);
    return approveSignPassword(signId, savePass, password).then(() => {
      setIsBusy(false);
      onAction();
    }).catch(error => {
      setIsBusy(false);
      setError(error.message);
      console.error(error);
    });
  }, [onAction, password, savePass, setError, setIsBusy, signId]);

  const _onCancel = useCallback(() => cancelSignRequest(signId).then(() => onAction()).catch(error => console.error(error)), [onAction, signId]);

  const RememberPasswordCheckbox = () => /*#__PURE__*/_jsx(Checkbox, {
    checked: savePass,
    label: isLocked ? t('Remember my password for the next {{expiration}} minutes', {
      replace: {
        expiration: PASSWORD_EXPIRY_MIN
      }
    }) : t('Extend the period without password by {{expiration}} minutes', {
      replace: {
        expiration: PASSWORD_EXPIRY_MIN
      }
    }),
    onChange: setSavePass
  });

  return /*#__PURE__*/_jsxs(ButtonArea, {
    className: className,
    children: [isFirst && !isExternal && /*#__PURE__*/_jsxs(_Fragment, {
      children: [isLocked && /*#__PURE__*/_jsx(Unlock, {
        error: error,
        isBusy: isBusy,
        onSign: _onSign,
        password: password,
        setError: setError,
        setPassword: setPassword
      }), /*#__PURE__*/_jsx(RememberPasswordCheckbox, {}), /*#__PURE__*/_jsx(Button, {
        isBusy: isBusy,
        isDisabled: !!isLocked && !password || !!error,
        onClick: _onSign,
        children: buttonText
      })]
    }), /*#__PURE__*/_jsx(ActionBar, {
      className: "cancelButton",
      children: /*#__PURE__*/_jsx(Link, {
        isDanger: true,
        onClick: _onCancel,
        children: t('Cancel')
      })
    })]
  });
}

export default styled(SignArea).withConfig({
  displayName: "SignArea",
  componentId: "sc-cv4yh6-0"
})(["flex-direction:column;padding:6px 24px;.cancelButton{margin-top:4px;margin-bottom:4px;text-decoration:underline;a{margin:auto;}}"]);