"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountWithChildren = accountWithChildren;
exports.buildHierarchy = buildHierarchy;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _getNetworkMap = _interopRequireDefault(require("./getNetworkMap.cjs"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function compareByCreation(a, b) {
  return (a.whenCreated || Infinity) - (b.whenCreated || Infinity);
}

function compareByName(a, b) {
  var _a$name, _b$name;

  const nameA = ((_a$name = a.name) === null || _a$name === void 0 ? void 0 : _a$name.toUpperCase()) || '';
  const nameB = ((_b$name = b.name) === null || _b$name === void 0 ? void 0 : _b$name.toUpperCase()) || '';
  return nameA.localeCompare(nameB);
}

function compareByPath(a, b) {
  var _a$suri, _b$suri;

  const suriA = ((_a$suri = a.suri) === null || _a$suri === void 0 ? void 0 : _a$suri.toUpperCase()) || '';
  const suriB = ((_b$suri = b.suri) === null || _b$suri === void 0 ? void 0 : _b$suri.toUpperCase()) || '';
  return suriA.localeCompare(suriB);
}

function compareByNetwork(a, b) {
  const networkMap = (0, _getNetworkMap.default)();
  const networkA = networkMap.get((a === null || a === void 0 ? void 0 : a.genesisHash) || '') || '';
  const networkB = networkMap.get((b === null || b === void 0 ? void 0 : b.genesisHash) || '') || '';
  return networkA.localeCompare(networkB);
}

function compareByPathThenCreation(a, b) {
  // if the paths are equal, compare by creation time
  return compareByPath(a, b) || compareByCreation(a, b);
}

function compareByNameThenPathThenCreation(a, b) {
  // This comparison happens after an initial sorting by network.
  // if the 2 accounts are from different networks, don't touch their order
  if (a.genesisHash !== b.genesisHash) {
    return 0;
  } // if the names are equal, compare by path then creation time


  return compareByName(a, b) || compareByPathThenCreation(a, b);
}

function accountWithChildren(accounts) {
  return account => {
    const children = accounts.filter(({
      parentAddress
    }) => account.address === parentAddress).map(accountWithChildren(accounts)).sort(compareByNameThenPathThenCreation);
    return children.length === 0 ? account : _objectSpread({
      children
    }, account);
  };
}

function buildHierarchy(accounts) {
  return accounts.filter(({
    parentAddress
  }) => // it is a parent
  !parentAddress || // we don't have a parent for this one
  !accounts.some(({
    address
  }) => parentAddress === address)).map(accountWithChildren(accounts)).sort(compareByNetwork).sort(compareByNameThenPathThenCreation);
}