"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _defaults = require("@axia-js/extension-base/defaults");

var _index = require("../../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../../hooks/useTranslation.cjs"));

var _messaging = require("../../../messaging.cjs");

var _Unlock = _interopRequireDefault(require("../Unlock.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SignArea({
  buttonText,
  className,
  error,
  isExternal,
  isFirst,
  setError,
  signId
}) {
  const [savePass, setSavePass] = (0, _react.useState)(false);
  const [isLocked, setIsLocked] = (0, _react.useState)(null);
  const [password, setPassword] = (0, _react.useState)('');
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const onAction = (0, _react.useContext)(_index.ActionContext);
  const {
    t
  } = (0, _useTranslation.default)();
  (0, _react.useEffect)(() => {
    setIsLocked(null);
    let timeout;
    !isExternal && (0, _messaging.isSignLocked)(signId).then(({
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

  const _onSign = (0, _react.useCallback)(() => {
    setIsBusy(true);
    return (0, _messaging.approveSignPassword)(signId, savePass, password).then(() => {
      setIsBusy(false);
      onAction();
    }).catch(error => {
      setIsBusy(false);
      setError(error.message);
      console.error(error);
    });
  }, [onAction, password, savePass, setError, setIsBusy, signId]);

  const _onCancel = (0, _react.useCallback)(() => (0, _messaging.cancelSignRequest)(signId).then(() => onAction()).catch(error => console.error(error)), [onAction, signId]);

  const RememberPasswordCheckbox = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Checkbox, {
    checked: savePass,
    label: isLocked ? t('Remember my password for the next {{expiration}} minutes', {
      replace: {
        expiration: _defaults.PASSWORD_EXPIRY_MIN
      }
    }) : t('Extend the period without password by {{expiration}} minutes', {
      replace: {
        expiration: _defaults.PASSWORD_EXPIRY_MIN
      }
    }),
    onChange: setSavePass
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.ButtonArea, {
    className: className,
    children: [isFirst && !isExternal && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [isLocked && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unlock.default, {
        error: error,
        isBusy: isBusy,
        onSign: _onSign,
        password: password,
        setError: setError,
        setPassword: setPassword
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RememberPasswordCheckbox, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
        isBusy: isBusy,
        isDisabled: !!isLocked && !password || !!error,
        onClick: _onSign,
        children: buttonText
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionBar, {
      className: "cancelButton",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Link, {
        isDanger: true,
        onClick: _onCancel,
        children: t('Cancel')
      })
    })]
  });
}

var _default = (0, _styledComponents.default)(SignArea).withConfig({
  displayName: "SignArea",
  componentId: "sc-1x5uq7o-0"
})(["flex-direction:column;padding:6px 24px;.cancelButton{margin-top:4px;margin-bottom:4px;text-decoration:underline;a{margin:auto;}}"]);

exports.default = _default;