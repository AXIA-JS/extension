"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("@axia-js/extension-base/utils");

var _index = require("../../components/index.cjs");

var _useGenesisHashOptions = _interopRequireDefault(require("../../hooks/useGenesisHashOptions.cjs"));

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _messaging = require("../../messaging.cjs");

var _index2 = require("../../partials/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Account({
  address,
  className,
  genesisHash,
  isExternal,
  isHardware,
  isHidden,
  name,
  parentName,
  suri,
  type
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const [{
    isEditing,
    toggleActions
  }, setEditing] = (0, _react.useState)({
    isEditing: false,
    toggleActions: 0
  });
  const [editedName, setName] = (0, _react.useState)(name);
  const genesisOptions = (0, _useGenesisHashOptions.default)();

  const _onChangeGenesis = (0, _react.useCallback)(genesisHash => {
    (0, _messaging.tieAccount)(address, genesisHash || null).catch(console.error);
  }, [address]);

  const _toggleEdit = (0, _react.useCallback)(() => setEditing(({
    toggleActions
  }) => ({
    isEditing: !isEditing,
    toggleActions: ++toggleActions
  })), [isEditing]);

  const _saveChanges = (0, _react.useCallback)(() => {
    editedName && (0, _messaging.editAccount)(address, editedName).catch(console.error);

    _toggleEdit();
  }, [editedName, address, _toggleEdit]);

  const _actions = (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Link, {
      className: "menuItem",
      onClick: _toggleEdit,
      children: t('Rename')
    }), !isExternal && (0, _utils.canDerive)(type) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Link, {
      className: "menuItem",
      to: `/account/derive/${address}/locked`,
      children: t('Derive New Account')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuDivider, {}), !isExternal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Link, {
      className: "menuItem",
      isDanger: true,
      to: `/account/export/${address}`,
      children: t('Export Account')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Link, {
      className: "menuItem",
      isDanger: true,
      to: `/account/forget/${address}`,
      children: t('Forget Account')
    }), !isHardware && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MenuDivider, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "menuItem",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Dropdown, {
          className: "genesisSelection",
          label: "",
          onChange: _onChangeGenesis,
          options: genesisOptions,
          value: genesisHash || ''
        })
      })]
    })]
  }), [_onChangeGenesis, _toggleEdit, address, genesisHash, genesisOptions, isExternal, isHardware, t, type]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Address, {
      actions: _actions,
      address: address,
      className: "address",
      genesisHash: genesisHash,
      isExternal: isExternal,
      isHidden: isHidden,
      name: editedName,
      parentName: parentName,
      suri: suri,
      toggleActions: toggleActions,
      children: isEditing && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Name, {
        address: address,
        className: `editName ${parentName ? 'withParent' : ''}`,
        isFocused: true,
        label: ' ',
        onBlur: _saveChanges,
        onChange: setName
      })
    })
  });
}

var _default = (0, _styledComponents.default)(Account).withConfig({
  displayName: "Account",
  componentId: "sc-1nfb5fv-0"
})(({
  theme
}) => `
  .address {
    margin-bottom: 8px;
  }

  .editName {
    position: absolute;
    flex: 1;
    left: 70px;
    top: 10px;
    width: 350px;

    .danger {
      background-color: ${theme.bodyColor};
      margin-top: -13px;
      width: 330px;
    }

    input {
      height : 30px;
      width: 350px;
    }

    &.withParent {
      top: 16px
    }
  }

  .menuItem {
    border-radius: 8px;
    display: block;
    font-size: 15px;
    line-height: 20px;
    margin: 0;
    min-width: 13rem;
    padding: 4px 16px;

    .genesisSelection {
      margin: 0;
    }
  }
`);

exports.default = _default;