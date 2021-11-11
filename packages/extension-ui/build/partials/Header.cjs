"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _pjs = _interopRequireDefault(require("../assets/pjs.svg"));

var _Link = _interopRequireDefault(require("../components/Link.cjs"));

var _useOutsideClick = _interopRequireDefault(require("../hooks/useOutsideClick.cjs"));

var _MenuAdd = _interopRequireDefault(require("./MenuAdd.cjs"));

var _MenuSettings = _interopRequireDefault(require("./MenuSettings.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Header({
  children,
  className = '',
  showAdd,
  showBackArrow,
  showSettings,
  smallMargin = false,
  text
}) {
  const [isAddOpen, setShowAdd] = (0, _react.useState)(false);
  const [isSettingsOpen, setShowSettings] = (0, _react.useState)(false);
  const addRef = (0, _react.useRef)(null);
  const setRef = (0, _react.useRef)(null);
  (0, _useOutsideClick.default)(addRef, () => {
    isAddOpen && setShowAdd(!isAddOpen);
  });
  (0, _useOutsideClick.default)(setRef, () => {
    isSettingsOpen && setShowSettings(!isSettingsOpen);
  });

  const _toggleAdd = (0, _react.useCallback)(() => setShowAdd(isAddOpen => !isAddOpen), []);

  const _toggleSettings = (0, _react.useCallback)(() => setShowSettings(isSettingsOpen => !isSettingsOpen), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `${className} ${smallMargin ? 'smallMargin' : ''}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "container",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "branding",
        children: [showBackArrow ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
          className: "backlink",
          to: "/",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            className: "arrowLeftIcon",
            icon: _freeSolidSvgIcons.faArrowLeft
          })
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          className: "logo",
          src: _pjs.default
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "logoText",
          children: text || 'axia{.js}'
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "popupMenus",
        children: [showAdd && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "popupToggle",
          onClick: _toggleAdd,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            className: `plusIcon ${isAddOpen ? 'selected' : ''}`,
            icon: _freeSolidSvgIcons.faPlusCircle,
            size: "lg"
          })
        }), showSettings && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "popupToggle",
          "data-toggle-settings": true,
          onClick: _toggleSettings,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            className: `cogIcon ${isSettingsOpen ? 'selected' : ''}`,
            icon: _freeSolidSvgIcons.faCog,
            size: "lg"
          })
        })]
      }), isAddOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuAdd.default, {
        reference: addRef
      }), isSettingsOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuSettings.default, {
        reference: setRef
      }), children]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Header).withConfig({
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

exports.default = _default;