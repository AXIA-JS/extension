"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _react = _interopRequireDefault(require("react"));

var _Header = _interopRequireDefault(require("../partials/Header.cjs"));

var _Button = _interopRequireDefault(require("./Button.cjs"));

var _ButtonArea = _interopRequireDefault(require("./ButtonArea.cjs"));

var _translate = _interopRequireDefault(require("./translate.cjs"));

var _VerticalSpace = _interopRequireDefault(require("./VerticalSpace.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributor
// SPDX-License-Identifier: Apache-2.0
var _goHome = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("goHome");

// NOTE: This is the only way to do an error boundary, via extend
class ErrorBoundary extends _react.default.Component {
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
    return error ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
        text: t('An error occured')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: t('Something went wrong with the query and rendering of this component. {{message}}', {
          replace: {
            message: error.message
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_VerticalSpace.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonArea.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          onClick: (0, _classPrivateFieldLooseBase2.default)(this, _goHome)[_goHome],
          children: t('Back to home')
        })
      })]
    }) : children;
  }

}

var _default = (0, _translate.default)(ErrorBoundary);

exports.default = _default;