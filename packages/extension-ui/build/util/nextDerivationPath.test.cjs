"use strict";

var _nextDerivationPath = require("./nextDerivationPath.cjs");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
describe('Generate Derivation Path', () => {
  const acc = (address, parentAddress) => ({
    address,
    parentAddress
  });

  test('generates path for first masters child', () => {
    expect((0, _nextDerivationPath.nextDerivationPath)([acc('a')], 'a')).toEqual('//0');
  });
  test('generates path for third masters child', () => {
    expect((0, _nextDerivationPath.nextDerivationPath)([acc('a'), acc('b', 'a'), acc('c', 'a')], 'a')).toEqual('//2');
  });
  test('generates path for masters child when another root exists', () => {
    expect((0, _nextDerivationPath.nextDerivationPath)([acc('a'), acc('b', 'a'), acc('c', 'a'), acc('d')], 'a')).toEqual('//2');
  });
  test('generates path for masters grandchild', () => {
    expect((0, _nextDerivationPath.nextDerivationPath)([acc('a'), acc('b', 'a'), acc('c', 'b'), acc('d', 'b')], 'b')).toEqual('//2');
  });
});