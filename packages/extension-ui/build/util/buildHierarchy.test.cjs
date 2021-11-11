"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _buildHierarchy = require("./buildHierarchy.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const genesisExample = {
  AXIALUNAR: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  AXIA: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
};

const testHierarchy = (accounts, expected) => {
  expect((0, _buildHierarchy.buildHierarchy)(accounts)).toEqual(expected);
};

describe('Use Account Hierarchy', () => {
  const acc = (address, parentAddress, whenCreated, name, suri) => ({
    address,
    name,
    parentAddress,
    suri,
    whenCreated
  });

  test('for empty account list, returns empty list', () => {
    testHierarchy([], []);
  });
  test('returns one account', () => {
    testHierarchy([acc('a')], [acc('a')]);
  });
  test('puts child account into children field of parent: single child', () => {
    testHierarchy([acc('a'), acc('b', 'a')], [{
      address: 'a',
      children: [acc('b', 'a')]
    }]);
  });
  test('puts child account into children field of parent: more children', () => {
    testHierarchy([acc('a'), acc('b', 'a'), acc('c', 'a')], [{
      address: 'a',
      children: [acc('b', 'a'), acc('c', 'a')]
    }]);
  });
  test('puts child account into children field of parent: 2 roots', () => {
    testHierarchy([acc('a'), acc('b', 'a'), acc('c', 'a'), acc('d')], [{
      address: 'a',
      children: [acc('b', 'a'), acc('c', 'a')]
    }, acc('d')]);
  });
  test('handles grandchildren', () => {
    testHierarchy([acc('a'), acc('b', 'a'), acc('c', 'b')], [{
      address: 'a',
      children: [_objectSpread(_objectSpread({}, acc('b', 'a')), {}, {
        children: [acc('c', 'b')]
      })]
    }]);
  });
  test('sorts accounts by network', () => {
    testHierarchy([{
      address: 'b',
      genesisHash: genesisExample.AXIALUNAR
    }, {
      address: 'a',
      genesisHash: genesisExample.AXIA
    }, {
      address: 'c',
      genesisHash: genesisExample.AXIALUNAR
    }], [{
      address: 'b',
      genesisHash: genesisExample.AXIALUNAR
    }, {
      address: 'c',
      genesisHash: genesisExample.AXIALUNAR
    }, {
      address: 'a',
      genesisHash: genesisExample.AXIA
    }]);
  });
  test('sorts accounts by network and name', () => {
    testHierarchy([{
      address: 'b',
      genesisHash: genesisExample.AXIALUNAR,
      name: 'b-last-axialunar'
    }, {
      address: 'a',
      genesisHash: genesisExample.AXIA
    }, {
      address: 'c',
      genesisHash: genesisExample.AXIALUNAR,
      name: 'a-first-axialunar'
    }], [{
      address: 'c',
      genesisHash: genesisExample.AXIALUNAR,
      name: 'a-first-axialunar'
    }, {
      address: 'b',
      genesisHash: genesisExample.AXIALUNAR,
      name: 'b-last-axialunar'
    }, {
      address: 'a',
      genesisHash: genesisExample.AXIA
    }]);
  });
  test('sorts accounts by name and creation date', () => {
    testHierarchy([acc('b', undefined, 2, 'b'), acc('z', undefined, 1, 'b'), acc('a', undefined, 4, 'a')], [{
      address: 'a',
      name: 'a',
      whenCreated: 4
    }, {
      address: 'z',
      name: 'b',
      whenCreated: 1
    }, {
      address: 'b',
      name: 'b',
      whenCreated: 2
    }]);
  });
  test('sorts account children by name and path', () => {
    testHierarchy([acc('a', undefined, 1, 'a'), acc('b', 'a', 1, 'b', '/2'), acc('b', 'a', 1, 'b', '/0')], [{
      address: 'a',
      children: [acc('b', 'a', 1, 'b', '/0'), acc('b', 'a', 1, 'b', '/2')],
      name: 'a',
      whenCreated: 1
    }]);
  });
  test('sorts accounts with children by name and creation date', () => {
    testHierarchy([acc('b', undefined, 2, 'b'), acc('z', undefined, 1, 'b'), acc('d', 'b', 2, 'd'), acc('c', 'b', 3, 'c'), acc('a', undefined, 4, 'a')], [{
      address: 'a',
      name: 'a',
      whenCreated: 4
    }, {
      address: 'z',
      name: 'b',
      whenCreated: 1
    }, {
      address: 'b',
      children: [acc('c', 'b', 3, 'c'), acc('d', 'b', 2, 'd')],
      name: 'b',
      whenCreated: 2
    }]);
  });
  test('if creation time is missing, puts account at the back of a list', () => {
    testHierarchy([acc('a'), acc('b', undefined, 2), acc('c', undefined, 1)], [acc('c', undefined, 1), acc('b', undefined, 2), acc('a')]);
  });
});