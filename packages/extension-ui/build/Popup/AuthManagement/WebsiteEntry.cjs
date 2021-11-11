"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _components = require("@axia-js/extension-ui/components");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function WebsiteEntry({
  className = '',
  info,
  toggleAuth,
  url
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const switchAccess = (0, _react.useCallback)(() => {
    toggleAuth(url);
  }, [toggleAuth, url]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className} ${info.isAllowed ? 'allowed' : 'denied'}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "url",
      children: url
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Switch, {
      checked: info.isAllowed,
      checkedLabel: t('allowed'),
      className: "info",
      onChange: switchAccess,
      uncheckedLabel: t('denied')
    })]
  });
}

var _default = (0, _styledComponents.default)(WebsiteEntry).withConfig({
  displayName: "WebsiteEntry",
  componentId: "sc-6kv1yh-0"
})(({
  theme
}) => `
  display: flex;
  align-items: center;

  .url{
    flex: 1;
  }

  &.denied {
    .slider::before {
        background-color: ${theme.backButtonBackground};
      }
  }
`);

exports.default = _default;