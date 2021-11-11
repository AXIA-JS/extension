"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _util = require("@axia-js/util");

var _index = require("../../components/index.cjs");

var _useMetadata = _interopRequireDefault(require("../../hooks/useMetadata.cjs"));

var _useTranslation = _interopRequireDefault(require("../../hooks/useTranslation.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
function displayDecodeVersion(message, chain, specVersion) {
  return `${message}: chain=${chain.name}, specVersion=${chain.specVersion.toString()} (request specVersion=${specVersion.toString()})`;
}

function decodeMethod(data, chain, specVersion) {
  let args = null;
  let method = null;

  try {
    if (specVersion.eqn(chain.specVersion)) {
      method = chain.registry.createType('Call', data);
      args = method.toHuman().args;
    } else {
      console.log(displayDecodeVersion('Outdated metadata to decode', chain, specVersion));
    }
  } catch (error) {
    console.error(`${displayDecodeVersion('Error decoding method', chain, specVersion)}:: ${error.message}`);
    args = null;
    method = null;
  }

  return {
    args,
    method
  };
}

function renderMethod(data, {
  args,
  method
}, t) {
  if (!args || !method) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "label",
        children: t('method data')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "data",
        children: data
      })]
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "label",
        children: t('method')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "data",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("details", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("summary", {
            children: [method.section, ".", method.method, method.meta ? `(${method.meta.args.map(({
              name
            }) => name).join(', ')})` : '']
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
            children: JSON.stringify(args, null, 2)
          })]
        })
      })]
    }), method.meta && /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "label",
        children: t('info')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "data",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("details", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("summary", {
            children: method.meta.docs.map(d => d.toString().trim()).join(' ')
          })
        })
      })]
    })]
  });
}

function mortalityAsString(era, hexBlockNumber, t) {
  if (era.isImmortalEra) {
    return t('immortal');
  }

  const blockNumber = (0, _util.bnToBn)(hexBlockNumber);
  const mortal = era.asMortalEra;
  return t('mortal, valid from {{birth}} to {{death}}', {
    replace: {
      birth: (0, _util.formatNumber)(mortal.birth(blockNumber)),
      death: (0, _util.formatNumber)(mortal.death(blockNumber))
    }
  });
}

function Extrinsic({
  className,
  payload: {
    era,
    nonce,
    tip
  },
  request: {
    blockNumber,
    genesisHash,
    method,
    specVersion: hexSpec
  },
  url
}) {
  const {
    t
  } = (0, _useTranslation.default)();
  const chain = (0, _useMetadata.default)(genesisHash);
  const specVersion = (0, _react.useRef)((0, _util.bnToBn)(hexSpec)).current;
  const decoded = (0, _react.useMemo)(() => chain && chain.hasMetadata ? decodeMethod(method, chain, specVersion) : {
    args: null,
    method: null
  }, [method, chain, specVersion]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Table, {
    className: className,
    isFull: true,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "label",
        children: t('from')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "data",
        children: url
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "label",
        children: chain ? t('chain') : t('genesis')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "data",
        children: chain ? chain.name : genesisHash
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "label",
        children: t('version')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "data",
        children: specVersion.toNumber()
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "label",
        children: t('nonce')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "data",
        children: (0, _util.formatNumber)(nonce)
      })]
    }), !tip.isEmpty && /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "label",
        children: t('tip')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "data",
        children: (0, _util.formatNumber)(tip)
      })]
    }), renderMethod(method, decoded, t), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "label",
        children: t('lifetime')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "data",
        children: mortalityAsString(era, blockNumber, t)
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Extrinsic);

exports.default = _default;