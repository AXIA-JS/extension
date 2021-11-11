"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("../../../../__mocks__/chrome.cjs");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _testUtils = require("react-dom/test-utils");

var _testHelpers = require("../testHelpers.cjs");

var _BackButton = _interopRequireDefault(require("./BackButton.cjs"));

var _index = require("./index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
const account = {
  name: 'My AXIACoin Account',
  password: 'somepassword'
};
const buttonLabel = 'create account';
let wrapper;
const onBackClick = jest.fn();
const onCreate = jest.fn();
const onNameChange = jest.fn();

const type = async (input, value) => {
  input.simulate('change', {
    target: {
      value
    }
  });
  await (0, _testUtils.act)(_testHelpers.flushAllPromises);
  wrapper.update();
};

const capsLockOn = async input => {
  input.simulate('keyPress', {
    getModifierState: () => true
  });
  await (0, _testUtils.act)(_testHelpers.flushAllPromises);
  wrapper.update();
};

const enterName = name => type(wrapper.find('input').first(), name);

const password = password => () => type(wrapper.find('input[type="password"]').first(), password);

const repeat = password => () => type(wrapper.find('input[type="password"]').last(), password); // eslint-disable-next-line @typescript-eslint/no-unsafe-return


const mountComponent = (isBusy = false) => (0, _enzyme.mount)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.AccountNamePasswordCreation, {
  buttonLabel: buttonLabel,
  isBusy: isBusy,
  onBackClick: onBackClick,
  onCreate: onCreate,
  onNameChange: onNameChange
}));

describe('AccountNamePasswordCreation', () => {
  beforeEach(async () => {
    wrapper = mountComponent();
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    wrapper.update();
  });
  it('only account name input is visible at first', () => {
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-name]').find(_index.Input)).toHaveLength(1);
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-password]').find(_index.Input)).toHaveLength(1);
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-repeat-password]')).toHaveLength(0);
    expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(true);
  });
  it('next step button has the correct label', () => {
    expect(wrapper.find(_index.NextStepButton).text()).toBe(buttonLabel);
  });
  it('back button calls onBackClick', () => {
    wrapper.find(_BackButton.default).simulate('click');
    expect(onBackClick).toHaveBeenCalledTimes(1);
  });
  it('input should not be highlighted as error until first interaction', () => {
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-name]').find(_index.Input).prop('withError')).toBe(false);
  });
  it('after typing less than 3 characters into name input, password input is not visible', async () => {
    await enterName('ab');
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-name]').find(_index.Input).prop('withError')).toBe(true);
    expect(wrapper.find('.warning-message').first().text()).toBe('Account name is too short');
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-password]').find(_index.Input)).toHaveLength(1);
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-repeat-password]')).toHaveLength(0);
    expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(true);
  });
  it('input should keep showing error when something has been typed but then erased', async () => {
    await enterName(account.name);
    await enterName('');
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-name]').find(_index.Input).prop('withError')).toBe(true);
  });
  it('after typing 3 characters into name input, onNameChange is called', async () => {
    await enterName(account.name);
    expect(onNameChange).toHaveBeenLastCalledWith(account.name);
  });
  it('after typing 3 characters into name input, first password input is visible', async () => {
    await enterName(account.name);
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-name]').find(_index.Input).first().prop('withError')).toBe(false);
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-password]').find(_index.Input)).toHaveLength(1);
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-repeat-password]')).toHaveLength(0);
    expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(true);
  });
  it('password with caps lock should show a warning', async () => {
    await enterName('abc').then(password('abcde'));
    await capsLockOn(wrapper.find(_index.InputWithLabel).find('[data-input-password]').find(_index.Input));
    expect(wrapper.find('.warning-message').first().text()).toBe('Warning: Caps lock is on');
  });
  it('password shorter than 6 characters should be not valid', async () => {
    await enterName('abc').then(password('abcde'));
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-password]').find(_index.Input).prop('withError')).toBe(true);
    expect(wrapper.find('.warning-message').text()).toBe('Password is too short');
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-password]').find(_index.Input)).toHaveLength(1);
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-repeat-password]')).toHaveLength(0);
    expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(true);
  });
  it('submit button is not enabled until both passwords are equal', async () => {
    await enterName('abc').then(password('abcdef')).then(repeat('abcdeg'));
    expect(wrapper.find('.warning-message').text()).toBe('Passwords do not match');
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-repeat-password]').find(_index.Input).prop('withError')).toBe(true);
    expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(true);
  });
  it('submit button is enabled when both passwords are equal', async () => {
    await enterName('abc').then(password('abcdef')).then(repeat('abcdef'));
    expect(wrapper.find('.warning-message')).toHaveLength(0);
    expect(wrapper.find(_index.InputWithLabel).find('[data-input-repeat-password]').find(_index.Input).prop('withError')).toBe(false);
    expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(false);
  });
  it('calls onCreate with provided name and password', async () => {
    await enterName(account.name).then(password(account.password)).then(repeat(account.password));
    wrapper.find('[data-button-action="add new root"] button').simulate('click');
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    expect(onCreate).toBeCalledWith(account.name, account.password);
  });
  describe('All fields are filled correctly, but then', () => {
    beforeEach(async () => {
      await enterName(account.name).then(password(account.password)).then(repeat(account.password));
    });
    it('first password input is cleared - second one disappears and button get disabled', async () => {
      await type(wrapper.find('input[type="password"]').first(), '');
      expect(wrapper.find(_index.InputWithLabel).find('[data-input-repeat-password]')).toHaveLength(0);
      expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(true);
    });
    it('first password changes - button is disabled', async () => {
      await type(wrapper.find('input[type="password"]').first(), 'abcdef');
      expect(wrapper.find('.warning-message').text()).toBe('Passwords do not match');
      expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(true);
    });
    it('first password changes, then second changes too - button is enabled', async () => {
      await type(wrapper.find('input[type="password"]').first(), 'abcdef');
      await type(wrapper.find('input[type="password"]').last(), 'abcdef');
      expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(false);
    });
    it('second password changes, then first changes too - button is enabled', async () => {
      await type(wrapper.find('input[type="password"]').last(), 'abcdef');
      await type(wrapper.find('input[type="password"]').first(), 'abcdef');
      expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(false);
    });
    it('name is removed - button is disabled', async () => {
      await enterName('');
      expect(wrapper.find('[data-button-action="add new root"] button').prop('disabled')).toBe(true);
    });
  });
});
describe('AccountNamePasswordCreation busy button', () => {
  beforeAll(async () => {
    wrapper = mountComponent(true);
    await (0, _testUtils.act)(_testHelpers.flushAllPromises);
    wrapper.update();
  });
  it('button is busy', () => {
    expect(wrapper.find(_index.NextStepButton).prop('isBusy')).toBe(true);
  });
});