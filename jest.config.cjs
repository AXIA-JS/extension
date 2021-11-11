// Copyright 2019-2021 @axia-js/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@axia-js/dev/config/jest.cjs');

module.exports = {
  ...config,
  moduleNameMapper: {
    '@axia-js/extension-(base|chains|compat-metamask|dapp|inject|ui)(.*)$': '<rootDir>/packages/extension-$1/src/$2',
    // eslint-disable-next-line sort-keys
    '@axia-js/extension(.*)$': '<rootDir>/packages/extension/src/$1',
    '\\.(css|less)$': 'empty/object',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  },
  testEnvironment: 'jsdom'
};
