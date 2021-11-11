// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import arrow from "../../assets/arrow-down.svg";
import { Address } from "../../components/index.js";
import useOutsideClick from "../../hooks/useOutsideClick.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function AddressDropdown({
  allAddresses,
  className,
  onSelect,
  selectedAddress,
  selectedGenesis
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const ref = useRef(null);

  const _hideDropdown = useCallback(() => setDropdownVisible(false), []);

  const _toggleDropdown = useCallback(() => setDropdownVisible(!isDropdownVisible), [isDropdownVisible]);

  const _selectParent = useCallback(newParent => () => onSelect(newParent), [onSelect]);

  useOutsideClick(ref, _hideDropdown);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      onClick: _toggleDropdown,
      ref: ref,
      children: /*#__PURE__*/_jsx(Address, {
        address: selectedAddress,
        className: "address",
        genesisHash: selectedGenesis
      })
    }), /*#__PURE__*/_jsx("div", {
      className: `dropdown ${isDropdownVisible ? 'visible' : ''}`,
      children: allAddresses.map(([address, genesisHash]) => /*#__PURE__*/_jsx("div", {
        "data-parent-option": true,
        onClick: _selectParent(address),
        children: /*#__PURE__*/_jsx(Address, {
          address: address,
          className: "address",
          genesisHash: genesisHash
        })
      }, address))
    })]
  });
}

export default styled(AddressDropdown).withConfig({
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
    background: url(${arrow}) center no-repeat;
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