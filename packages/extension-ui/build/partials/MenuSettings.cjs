"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _uiSettings = _interopRequireDefault(require("@axia-js/ui-settings"));

var _index = require("../components/index.cjs");

var _useIsPopup = _interopRequireDefault(require("../hooks/useIsPopup.cjs"));

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _messaging = require("../messaging.cjs");

var _getLanguageOptions = _interopRequireDefault(require("../util/getLanguageOptions.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
const notificationOptions = ['Extension', 'PopUp', 'Window'].map(item => ({
  text: item,
  value: item.toLowerCase()
}));

const prefixOptions = _uiSettings.default.availablePrefixes.filter(({
  value
}) => value !== -1).map(({
  text,
  value
}) => ({
  text,
  value: `${value}`
}));

function MenuSettings({
  className,
  reference
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const [camera, setCamera] = (0, _react.useState)(_uiSettings.default.camera === 'on');
  const [prefix, setPrefix] = (0, _react.useState)(`${_uiSettings.default.prefix === -1 ? 42 : _uiSettings.default.prefix}`);
  const [notification, updateNotification] = (0, _react.useState)(_uiSettings.default.notification);
  const themeContext = (0, _react.useContext)(_styledComponents.ThemeContext);
  const setTheme = (0, _react.useContext)(_index.ThemeSwitchContext);
  const isPopup = (0, _useIsPopup.default)();
  const languageOptions = (0, _react.useMemo)(() => (0, _getLanguageOptions.default)(), []);
  const onAction = (0, _react.useContext)(_index.ActionContext);
  (0, _react.useEffect)(() => {
    _uiSettings.default.set({
      camera: camera ? 'on' : 'off'
    });
  }, [camera]);

  const _onChangePrefix = (0, _react.useCallback)(value => {
    setPrefix(value);

    _uiSettings.default.set({
      prefix: parseInt(value, 10)
    });
  }, []);

  const _onChangeNotification = (0, _react.useCallback)(value => {
    (0, _messaging.setNotification)(value).catch(console.error);
    updateNotification(value);

    _uiSettings.default.set({
      notification: value
    });
  }, []);

  const _onChangeTheme = (0, _react.useCallback)(checked => setTheme(checked ? 'dark' : 'light'), [setTheme]);

  const _onWindowOpen = (0, _react.useCallback)(() => (0, _messaging.windowOpen)('/').catch(console.error), []);

  const _onChangeLang = (0, _react.useCallback)(value => {
    _uiSettings.default.set({
      i18nLang: value
    });
  }, []);

  const _goToAuthList = (0, _react.useCallback)(() => {
    onAction('auth-list');
  }, [onAction]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Menu, {
    className: className,
    reference: reference,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "setting",
      title: "Theme",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Switch, {
        checked: themeContext.id === _index.themes.dark.id,
        checkedLabel: t('Dark'),
        onChange: _onChangeTheme,
        uncheckedLabel: t('Light')
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "setting",
      title: t('Display address format for'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
        className: "dropdown",
        label: "",
        onChange: _onChangePrefix,
        options: prefixOptions,
        value: `${prefix}`
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "setting",
      title: t('Language'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
        className: "dropdown",
        label: "",
        onChange: _onChangeLang,
        options: languageOptions,
        value: _uiSettings.default.i18nLang
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "setting",
      title: t('Notifications'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
        className: "dropdown",
        label: "",
        onChange: _onChangeNotification,
        options: notificationOptions,
        value: notification
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "setting",
      title: t('External accounts and Access'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Checkbox, {
        checked: camera,
        className: "checkbox camera",
        label: t('Allow QR Camera Access'),
        onChange: setCamera
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuDivider, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "setting",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionText, {
        className: "manageWebsiteAccess",
        icon: _freeSolidSvgIcons.faTasks,
        onClick: _goToAuthList,
        text: t('Manage Website Access')
      })
    }), isPopup && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuItem, {
      className: "setting",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ActionText, {
        className: "openWindow",
        icon: _freeSolidSvgIcons.faExpand,
        onClick: _onWindowOpen,
        text: t('Open extension in new window')
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(MenuSettings).withConfig({
  displayName: "MenuSettings",
  componentId: "sc-7f8b8j-0"
})(({
  theme
}) => `
  margin-top: 50px;
  right: 24px;
  user-select: none;

  .openWindow, .manageWebsiteAccess{
    span {
      color: ${theme.textColor};
      font-size: ${theme.fontSize};
      line-height: ${theme.lineHeight};
      text-decoration: none;
      vertical-align: middle;
    }

    ${_index.Svg} {
      background: ${theme.textColor};
      height: 20px;
      top: 4px;
      width: 20px;
    }
  }

  > .setting {
    > .checkbox {
      color: ${theme.textColor};
      line-height: 20px;
      font-size: 15px;
      margin-bottom: 0;

      &.ledger {
        margin-top: 0.2rem;
      }

      label {
        color: ${theme.textColor};
      }
    }

    > .dropdown {
      background: ${theme.background};
      margin-bottom: 0;
      margin-top: 9px;
      margin-right: 0;
      width: 100%;
    }
  }
`));

exports.default = _default;