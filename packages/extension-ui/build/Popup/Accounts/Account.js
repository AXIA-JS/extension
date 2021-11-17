// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { canDerive } from '@axia-js/extension-base/utils';
import { Address, Dropdown, Link, MenuDivider } from "../../components/index.js";
import useGenesisHashOptions from "../../hooks/useGenesisHashOptions.js";
import useTranslation from "../../hooks/useTranslation.js";
import { editAccount, tieAccount } from "../../messaging.js";
import { Name } from "../../partials/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

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
  } = useTranslation();
  const [{
    isEditing,
    toggleActions
  }, setEditing] = useState({
    isEditing: false,
    toggleActions: 0
  });
  const [editedName, setName] = useState(name);
  const genesisOptions = useGenesisHashOptions();

  const _onChangeGenesis = useCallback(genesisHash => {
    tieAccount(address, genesisHash || null).catch(console.error);
  }, [address]);

  const _toggleEdit = useCallback(() => setEditing(({
    toggleActions
  }) => ({
    isEditing: !isEditing,
    toggleActions: ++toggleActions
  })), [isEditing]);

  const _saveChanges = useCallback(() => {
    editedName && editAccount(address, editedName).catch(console.error);

    _toggleEdit();
  }, [editedName, address, _toggleEdit]);

  const _actions = useMemo(() => /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Link, {
      className: "menuItem",
      onClick: _toggleEdit,
      children: t('Rename')
    }), !isExternal && canDerive(type) && /*#__PURE__*/_jsx(Link, {
      className: "menuItem",
      to: `/account/derive/${address}/locked`,
      children: t('Derive New Account')
    }), /*#__PURE__*/_jsx(MenuDivider, {}), !isExternal && /*#__PURE__*/_jsx(Link, {
      className: "menuItem",
      isDanger: true,
      to: `/account/export/${address}`,
      children: t('Export Account')
    }), /*#__PURE__*/_jsx(Link, {
      className: "menuItem",
      isDanger: true,
      to: `/account/forget/${address}`,
      children: t('Forget Account')
    }), !isHardware && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(MenuDivider, {}), /*#__PURE__*/_jsx("div", {
        className: "menuItem",
        children: /*#__PURE__*/_jsx(Dropdown, {
          className: "genesisSelection",
          label: "",
          onChange: _onChangeGenesis,
          options: genesisOptions,
          value: genesisHash || ''
        })
      })]
    })]
  }), [_onChangeGenesis, _toggleEdit, address, genesisHash, genesisOptions, isExternal, isHardware, t, type]);

  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(Address, {
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
      children: isEditing && /*#__PURE__*/_jsx(Name, {
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

export default styled(Account).withConfig({
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