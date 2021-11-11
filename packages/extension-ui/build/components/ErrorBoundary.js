import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2019-2021 @axia-js/extension-ui authors & contributor
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Header from "../partials/Header.js";
import Button from "./Button.js";
import ButtonArea from "./ButtonArea.js";
import translate from "./translate.js";
import VerticalSpace from "./VerticalSpace.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var _goHome = /*#__PURE__*/_classPrivateFieldLooseKey("goHome");

// NOTE: This is the only way to do an error boundary, via extend
class ErrorBoundary extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      error: null
    };
    Object.defineProperty(this, _goHome, {
      writable: true,
      value: () => {
        this.setState({
          error: null
        });
        window.location.hash = '/';
      }
    });
  }

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidUpdate(prevProps) {
    const {
      error
    } = this.state;
    const {
      trigger
    } = this.props;

    if (error !== null && prevProps.trigger !== trigger) {
      this.setState({
        error: null
      });
    }
  }

  render() {
    const {
      children,
      t
    } = this.props;
    const {
      error
    } = this.state;
    return error ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Header, {
        text: t('An error occured')
      }), /*#__PURE__*/_jsx("div", {
        children: t('Something went wrong with the query and rendering of this component. {{message}}', {
          replace: {
            message: error.message
          }
        })
      }), /*#__PURE__*/_jsx(VerticalSpace, {}), /*#__PURE__*/_jsx(ButtonArea, {
        children: /*#__PURE__*/_jsx(Button, {
          onClick: _classPrivateFieldLooseBase(this, _goHome)[_goHome],
          children: t('Back to home')
        })
      })]
    }) : children;
  }

}

export default translate(ErrorBoundary);