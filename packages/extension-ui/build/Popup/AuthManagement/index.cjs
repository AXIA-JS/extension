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

var _messaging = require("../../messaging.cjs");

var _index = require("../../partials/index.cjs");

var _WebsiteEntry = _interopRequireDefault(require("./WebsiteEntry.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AuthManagement({
  className
}) {
  var _Object$entries;

  const {
    t
  } = (0, _useTranslation.default)();
  const [authList, setAuthList] = (0, _react.useState)(null);
  const [filter, setFilter] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    (0, _messaging.getAuthList)().then(({
      list
    }) => setAuthList(list)).catch(e => console.error(e));
  }, []);

  const _onChangeFilter = (0, _react.useCallback)(filter => {
    setFilter(filter);
  }, []);

  const toggleAuth = (0, _react.useCallback)(url => {
    (0, _messaging.toggleAuthorization)(url).then(({
      list
    }) => setAuthList(list)).catch(console.error);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Header, {
      showBackArrow: true,
      smallMargin: true,
      text: t('Manage Website Access')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.InputFilter, {
        onChange: _onChangeFilter,
        placeholder: t('example.com'),
        value: filter
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: className,
        children: !authList || !((_Object$entries = Object.entries(authList)) !== null && _Object$entries !== void 0 && _Object$entries.length) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "empty-list",
          children: t('No website request yet!')
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "website-list",
            children: Object.entries(authList).filter(([url]) => url.includes(filter)).map(([url, info]) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_WebsiteEntry.default, {
              info: info,
              toggleAuth: toggleAuth,
              url: url
            }, url))
          })
        })
      })]
    })]
  });
}

var _default = (0, _styledComponents.default)(AuthManagement).withConfig({
  displayName: "AuthManagement",
  componentId: "sc-1m4efn1-0"
})(["height:calc(100vh - 2px);overflow-y:auto;.empty-list{text-align:center;}"]);

exports.default = _default;