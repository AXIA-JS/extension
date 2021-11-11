"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _useIsMounted = _interopRequireDefault(require("../hooks/useIsMounted.cjs"));

var _validators = require("../util/validators.cjs");

var _Warning = _interopRequireDefault(require("./Warning.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "component", "defaultValue", "onValidatedChange", "validator"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ValidatedInput(_ref) {
  let {
    className,
    component: Input,
    defaultValue,
    onValidatedChange,
    validator
  } = _ref,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  const [value, setValue] = (0, _react.useState)(defaultValue || '');
  const [validationResult, setValidationResult] = (0, _react.useState)(_validators.Result.ok(''));
  const isMounted = (0, _useIsMounted.default)();
  (0, _react.useEffect)(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  (0, _react.useEffect)(() => {
    // Do not show any error on first mount
    if (!isMounted) {
      return;
    } // eslint-disable-next-line @typescript-eslint/no-floating-promises


    (async () => {
      const result = await validator(value);
      setValidationResult(result);
      onValidatedChange(_validators.Result.isOk(result) ? value : null);
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value, validator, onValidatedChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Input, _objectSpread(_objectSpread({}, props), {}, {
      isError: _validators.Result.isError(validationResult),
      onChange: setValue,
      value: value
    })), _validators.Result.isError(validationResult) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Warning.default, {
      isBelowInput: true,
      isDanger: true,
      children: validationResult.error.errorDescription
    })]
  });
}

var _default = ValidatedInput;
exports.default = _default;