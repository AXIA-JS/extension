"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("../../components/index.cjs");

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _index2 = require("../../partials/index.cjs");

var _AccountsTree = _interopRequireDefault(require("./AccountsTree.cjs"));

var _AddAccount = _interopRequireDefault(require("./AddAccount.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Accounts({
  className
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const {
    hierarchy
  } = (0, _react.useContext)(_index.AccountContext);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: hierarchy.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_AddAccount.default, {}) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Header, {
        showAdd: true,
        showSettings: true,
        text: t('Accounts')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: className,
        children: hierarchy.map((json, index) => /*#__PURE__*/(0, _react.createElement)(_AccountsTree.default, _objectSpread(_objectSpread({}, json), {}, {
          key: `${index}:${json.address}`
        })))
      })]
    })
  });
}

var _default = (0, _styledComponents.default)(Accounts).withConfig({
  displayName: "Accounts",
  componentId: "sc-1a6qik2-0"
})(["height:calc(100vh - 2px);overflow-y:scroll;margin-top:-25px;padding-top:25px;scrollbar-width:none;&::-webkit-scrollbar{display:none;}"]);

exports.default = _default;