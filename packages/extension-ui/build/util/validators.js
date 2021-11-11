// Copyright 2019-2021 @axia-js/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0
export const Result = {
  error: errorDescription => ({
    error: {
      errorDescription
    }
  }),

  isError(value) {
    return Object.hasOwnProperty.call(value, 'error');
  },

  isOk(value) {
    return Object.hasOwnProperty.call(value, 'ok');
  },

  ok: ok => ({
    ok
  })
};
export function allOf(...validators) {
  return async value => {
    for (const validator of validators) {
      const validationResult = await validator(value);

      if (Result.isError(validationResult)) {
        return validationResult;
      }
    }

    return Result.ok(value);
  };
}
export function isNotShorterThan(minLength, errorText) {
  return value => {
    return value.length < minLength ? Result.error(errorText) : Result.ok(value);
  };
}
export function isSameAs(expectedValue, errorText) {
  return value => {
    return value !== expectedValue ? Result.error(errorText) : Result.ok(value);
  };
}