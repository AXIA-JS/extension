// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef } from 'react';
import { bnToBn, formatNumber } from '@axia-js/util';
import { Table } from "../../components/index.js";
import useMetadata from "../../hooks/useMetadata.js";
import useTranslation from "../../hooks/useTranslation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

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
    return /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "label",
        children: t('method data')
      }), /*#__PURE__*/_jsx("td", {
        className: "data",
        children: data
      })]
    });
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "label",
        children: t('method')
      }), /*#__PURE__*/_jsx("td", {
        className: "data",
        children: /*#__PURE__*/_jsxs("details", {
          children: [/*#__PURE__*/_jsxs("summary", {
            children: [method.section, ".", method.method, method.meta ? `(${method.meta.args.map(({
              name
            }) => name).join(', ')})` : '']
          }), /*#__PURE__*/_jsx("pre", {
            children: JSON.stringify(args, null, 2)
          })]
        })
      })]
    }), method.meta && /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "label",
        children: t('info')
      }), /*#__PURE__*/_jsx("td", {
        className: "data",
        children: /*#__PURE__*/_jsx("details", {
          children: /*#__PURE__*/_jsx("summary", {
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

  const blockNumber = bnToBn(hexBlockNumber);
  const mortal = era.asMortalEra;
  return t('mortal, valid from {{birth}} to {{death}}', {
    replace: {
      birth: formatNumber(mortal.birth(blockNumber)),
      death: formatNumber(mortal.death(blockNumber))
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
  } = useTranslation();
  const chain = useMetadata(genesisHash);
  const specVersion = useRef(bnToBn(hexSpec)).current;
  const decoded = useMemo(() => chain && chain.hasMetadata ? decodeMethod(method, chain, specVersion) : {
    args: null,
    method: null
  }, [method, chain, specVersion]);
  return /*#__PURE__*/_jsxs(Table, {
    className: className,
    isFull: true,
    children: [/*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "label",
        children: t('from')
      }), /*#__PURE__*/_jsx("td", {
        className: "data",
        children: url
      })]
    }), /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "label",
        children: chain ? t('chain') : t('genesis')
      }), /*#__PURE__*/_jsx("td", {
        className: "data",
        children: chain ? chain.name : genesisHash
      })]
    }), /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "label",
        children: t('version')
      }), /*#__PURE__*/_jsx("td", {
        className: "data",
        children: specVersion.toNumber()
      })]
    }), /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "label",
        children: t('nonce')
      }), /*#__PURE__*/_jsx("td", {
        className: "data",
        children: formatNumber(nonce)
      })]
    }), !tip.isEmpty && /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "label",
        children: t('tip')
      }), /*#__PURE__*/_jsx("td", {
        className: "data",
        children: formatNumber(tip)
      })]
    }), renderMethod(method, decoded, t), /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "label",
        children: t('lifetime')
      }), /*#__PURE__*/_jsx("td", {
        className: "data",
        children: mortalityAsString(era, blockNumber, t)
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Extrinsic);