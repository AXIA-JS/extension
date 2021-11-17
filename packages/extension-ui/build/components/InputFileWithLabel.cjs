"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _util = require("@axia-js/util");

var _useTranslation = _interopRequireDefault(require("../hooks/useTranslation.cjs"));

var _Label = _interopRequireDefault(require("./Label.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function classes(...classNames) {
  return classNames.filter(className => !!className).join(' ');
}

const BYTE_STR_0 = '0'.charCodeAt(0);
const BYTE_STR_X = 'x'.charCodeAt(0);

const NOOP = () => undefined;

function convertResult(result, convertHex) {
  const data = new Uint8Array(result); // this converts the input (if detected as hex), vai the hex conversion route

  if (convertHex && data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
    const hex = (0, _util.u8aToString)(data);

    if ((0, _util.isHex)(hex)) {
      return (0, _util.hexToU8a)(hex);
    }
  }

  return data;
}

function InputFile({
  accept,
  className = '',
  clearContent,
  convertHex,
  isDisabled,
  isError = false,
  label,
  onChange,
  placeholder
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const dropRef = /*#__PURE__*/(0, _react.createRef)();
  const [file, setFile] = (0, _react.useState)();

  const _onDrop = (0, _react.useCallback)(files => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onabort = NOOP;
      reader.onerror = NOOP;

      reader.onload = ({
        target
      }) => {
        if (target && target.result) {
          const name = file.name;
          const data = convertResult(target.result, convertHex);
          onChange && onChange(data, name);
          dropRef && setFile({
            name,
            size: data.length
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, [convertHex, dropRef, onChange]);

  const dropZone = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactDropzone.default, {
    accept: accept,
    disabled: isDisabled,
    multiple: false,
    onDrop: _onDrop,
    ref: dropRef,
    children: ({
      getInputProps,
      getRootProps
    }) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", _objectSpread(_objectSpread({}, getRootProps({
      className: classes('ui--InputFile', isError ? 'error' : '', className)
    })), {}, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", _objectSpread({}, getInputProps())), /*#__PURE__*/(0, _jsxRuntime.jsx)("em", {
        className: "label",
        children: !file || clearContent ? placeholder || t('click to select or drag and drop the file here') : placeholder || t('{{name}} ({{size}} bytes)', {
          replace: {
            name: file.name,
            size: (0, _util.formatNumber)(file.size)
          }
        })
      })]
    }))
  });
  return label ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
    label: label,
    children: dropZone
  }) : dropZone;
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(InputFile).withConfig({
  displayName: "InputFileWithLabel",
  componentId: "sc-1go79bx-0"
})(({
  isError,
  theme
}) => `
  border: 1px solid ${isError ? theme.errorBorderColor : theme.inputBorderColor};
  background: ${theme.inputBackground};
  border-radius: ${theme.borderRadius};
  color: ${isError ? theme.errorBorderColor : theme.textColor};
  font-size: 1rem;
  margin: 0.25rem 0;
  overflow-wrap: anywhere;
  padding: 0.5rem 0.75rem;

  &:hover {
    cursor: pointer;
  }
`));

exports.default = _default;