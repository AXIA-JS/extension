// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { faArrowLeft, faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import logo from "../assets/pjs.svg";
import Link from "../components/Link.js";
import useOutsideClick from "../hooks/useOutsideClick.js";
import MenuAdd from "./MenuAdd.js";
import MenuSettings from "./MenuSettings.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Header({
  children,
  className = '',
  showAdd,
  showBackArrow,
  showSettings,
  smallMargin = false,
  text
}) {
  const [isAddOpen, setShowAdd] = useState(false);
  const [isSettingsOpen, setShowSettings] = useState(false);
  const addRef = useRef(null);
  const setRef = useRef(null);
  useOutsideClick(addRef, () => {
    isAddOpen && setShowAdd(!isAddOpen);
  });
  useOutsideClick(setRef, () => {
    isSettingsOpen && setShowSettings(!isSettingsOpen);
  });

  const _toggleAdd = useCallback(() => setShowAdd(isAddOpen => !isAddOpen), []);

  const _toggleSettings = useCallback(() => setShowSettings(isSettingsOpen => !isSettingsOpen), []);

  return /*#__PURE__*/_jsx("div", {
    className: `${className} ${smallMargin ? 'smallMargin' : ''}`,
    children: /*#__PURE__*/_jsxs("div", {
      className: "container",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "branding",
        children: [showBackArrow ? /*#__PURE__*/_jsx(Link, {
          className: "backlink",
          to: "/",
          children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
            className: "arrowLeftIcon",
            icon: faArrowLeft
          })
        }) : /*#__PURE__*/_jsx("img", {
          className: "logo",
          src: logo
        }), /*#__PURE__*/_jsx("span", {
          className: "logoText",
          children: text || 'axia{.js}'
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "popupMenus",
        children: [showAdd && /*#__PURE__*/_jsx("div", {
          className: "popupToggle",
          onClick: _toggleAdd,
          children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
            className: `plusIcon ${isAddOpen ? 'selected' : ''}`,
            icon: faPlusCircle,
            size: "lg"
          })
        }), showSettings && /*#__PURE__*/_jsx("div", {
          className: "popupToggle",
          "data-toggle-settings": true,
          onClick: _toggleSettings,
          children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
            className: `cogIcon ${isSettingsOpen ? 'selected' : ''}`,
            icon: faCog,
            size: "lg"
          })
        })]
      }), isAddOpen && /*#__PURE__*/_jsx(MenuAdd, {
        reference: addRef
      }), isSettingsOpen && /*#__PURE__*/_jsx(MenuSettings, {
        reference: setRef
      }), children]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Header).withConfig({
  displayName: "Header",
  componentId: "sc-v6k9s5-0"
})(({
  theme
}) => `
  max-width: 100%;
  box-sizing: border-box;
  font-weight: normal;
  margin: 0;
  position: relative;
  margin-bottom: 25px;

  && {
    padding: 0 0 0;
  }

  > .container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid ${theme.inputBorderColor};
    min-height: 70px;

    .branding {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.labelColor};
      font-family: ${theme.fontFamily};
      text-align: center;
      margin-left: 24px;

      .logo {
        height: 28px;
        width: 28px;
        margin: 8px 12px 12px 0;
      }

      .logoText {
        color: ${theme.textColor};
        font-family: ${theme.fontFamily};
        font-size: 20px;
        line-height: 27px;
      }
    }

    .popupMenus {
      align-self: center;

      .popupToggle {
        display: inline-block;
        vertical-align: middle;

        &:last-child {
          margin-right: 24px;
        }

        &:hover {
          cursor: pointer;
        }
      }

      .popupToggle+.popupToggle {
        margin-left: 8px;
      }
    }
  }

  .plusIcon, .cogIcon {
    color: ${theme.iconNeutralColor};

    &.selected {
      color: ${theme.primaryColor};
    }
  }

  .arrowLeftIcon {
    color: ${theme.labelColor};
    margin-right: 1rem;
  }

  .backlink {
    color: ${theme.labelColor};
    min-height: 52px;
    text-decoration: underline;
    width: min-content;

    &:visited {
      color: ${theme.labelColor};
    }
  }

  &.smallMargin {
    margin-bottom: 15px;
  }
`));