"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _arrowDown = _interopRequireDefault(require("../../assets/arrow-down.svg"));

var _index = require("../../components/index.cjs");

var _useOutsideClick = _interopRequireDefault(require("../../hooks/useOutsideClick.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AddressDropdown({
  allAddresses,
  className,
  onSelect,
  selectedAddress,
  selectedGenesis
}) {
  const [isDropdownVisible, setDropdownVisible] = (0, _react.useState)(false);
  const ref = (0, _react.useRef)(null);

  const _hideDropdown = (0, _react.useCallback)(() => setDropdownVisible(false), []);

  const _toggleDropdown = (0, _react.useCallback)(() => setDropdownVisible(!isDropdownVisible), [isDropdownVisible]);

  const _selectParent = (0, _react.useCallback)(newParent => () => onSelect(newParent), [onSelect]);

  (0, _useOutsideClick.default)(ref, _hideDropdown);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      onClick: _toggleDropdown,
      ref: ref,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
        address: selectedAddress,
        className: "address",
        genesisHash: selectedGenesis
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: `dropdown ${isDropdownVisible ? 'visible' : ''}`,
      children: allAddresses.map(([address, genesisHash]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        "data-parent-option": true,
        onClick: _selectParent(address),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
          address: address,
          className: "address",
          genesisHash: genesisHash
        })
      }, address))
    })]
  });
}

var _default = (0, _styledComponents.default)(AddressDropdown).withConfig({
  displayName: "AddressDropdown",
  componentId: "sc-14o4elt-0"
})(({
  theme
}) => `
  margin-bottom: 16px;
  cursor: pointer;

  & > div:first-child > .address::after {
    content: '';
    position: absolute;
    top: 66%;
    transform: translateY(-50%);
    right: 11px;
    width: 30px;
    height: 30px;
    background: url(${_arrowDown.default}) center no-repeat;
    background-color: ${theme.inputBackground};
    pointer-events: none;
    border-radius: 4px;
    border: 1px solid ${theme.boxBorderColor};
  }

  .address .copyIcon {
    visibility: hidden;
  }

  .dropdown {
    position: absolute;
    visibility: hidden;
    width: 510px;
    z-index: 100;
    background: ${theme.bodyColor};
    max-height: 0;
    overflow: auto;
    padding: 5px;
    border: 1px solid ${theme.boxBorderColor};
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: -8px;

    &.visible{
      visibility: visible;
      max-height: 200px;
    }

    & > div {
      cursor: pointer;
    }
  }
`);

exports.default = _default;