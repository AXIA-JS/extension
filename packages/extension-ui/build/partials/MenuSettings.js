// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faExpand, faTasks } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import settings from '@axia-js/ui-settings';
import { ActionContext, ActionText, Checkbox, Dropdown, Menu, MenuDivider, MenuItem, Svg, Switch, themes, ThemeSwitchContext } from "../components/index.js";
import useIsPopup from "../hooks/useIsPopup.js";
import useTranslation from "../hooks/useTranslation.js";
import { setNotification, windowOpen } from "../messaging.js";
import getLanguageOptions from "../util/getLanguageOptions.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const notificationOptions = ['Extension', 'PopUp', 'Window'].map(item => ({
  text: item,
  value: item.toLowerCase()
}));
const prefixOptions = settings.availablePrefixes.filter(({
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
  } = useTranslation();
  const [camera, setCamera] = useState(settings.camera === 'on');
  const [prefix, setPrefix] = useState(`${settings.prefix === -1 ? 42 : settings.prefix}`);
  const [notification, updateNotification] = useState(settings.notification);
  const themeContext = useContext(ThemeContext);
  const setTheme = useContext(ThemeSwitchContext);
  const isPopup = useIsPopup();
  const languageOptions = useMemo(() => getLanguageOptions(), []);
  const onAction = useContext(ActionContext);
  useEffect(() => {
    settings.set({
      camera: camera ? 'on' : 'off'
    });
  }, [camera]);

  const _onChangePrefix = useCallback(value => {
    setPrefix(value);
    settings.set({
      prefix: parseInt(value, 10)
    });
  }, []);

  const _onChangeNotification = useCallback(value => {
    setNotification(value).catch(console.error);
    updateNotification(value);
    settings.set({
      notification: value
    });
  }, []);

  const _onChangeTheme = useCallback(checked => setTheme(checked ? 'dark' : 'light'), [setTheme]);

  const _onWindowOpen = useCallback(() => windowOpen('/').catch(console.error), []);

  const _onChangeLang = useCallback(value => {
    settings.set({
      i18nLang: value
    });
  }, []);

  const _goToAuthList = useCallback(() => {
    onAction('auth-list');
  }, [onAction]);

  return /*#__PURE__*/_jsxs(Menu, {
    className: className,
    reference: reference,
    children: [/*#__PURE__*/_jsx(MenuItem, {
      className: "setting",
      title: "Theme",
      children: /*#__PURE__*/_jsx(Switch, {
        checked: themeContext.id === themes.dark.id,
        checkedLabel: t('Dark'),
        onChange: _onChangeTheme,
        uncheckedLabel: t('Light')
      })
    }), /*#__PURE__*/_jsx(MenuItem, {
      className: "setting",
      title: t('Display address format for'),
      children: /*#__PURE__*/_jsx(Dropdown, {
        className: "dropdown",
        label: "",
        onChange: _onChangePrefix,
        options: prefixOptions,
        value: `${prefix}`
      })
    }), /*#__PURE__*/_jsx(MenuItem, {
      className: "setting",
      title: t('Language'),
      children: /*#__PURE__*/_jsx(Dropdown, {
        className: "dropdown",
        label: "",
        onChange: _onChangeLang,
        options: languageOptions,
        value: settings.i18nLang
      })
    }), /*#__PURE__*/_jsx(MenuItem, {
      className: "setting",
      title: t('Notifications'),
      children: /*#__PURE__*/_jsx(Dropdown, {
        className: "dropdown",
        label: "",
        onChange: _onChangeNotification,
        options: notificationOptions,
        value: notification
      })
    }), /*#__PURE__*/_jsx(MenuItem, {
      className: "setting",
      title: t('External accounts and Access'),
      children: /*#__PURE__*/_jsx(Checkbox, {
        checked: camera,
        className: "checkbox camera",
        label: t('Allow QR Camera Access'),
        onChange: setCamera
      })
    }), /*#__PURE__*/_jsx(MenuDivider, {}), /*#__PURE__*/_jsx(MenuItem, {
      className: "setting",
      children: /*#__PURE__*/_jsx(ActionText, {
        className: "manageWebsiteAccess",
        icon: faTasks,
        onClick: _goToAuthList,
        text: t('Manage Website Access')
      })
    }), isPopup && /*#__PURE__*/_jsx(MenuItem, {
      className: "setting",
      children: /*#__PURE__*/_jsx(ActionText, {
        className: "openWindow",
        icon: faExpand,
        onClick: _onWindowOpen,
        text: t('Open extension in new window')
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(MenuSettings).withConfig({
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

    ${Svg} {
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