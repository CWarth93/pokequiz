import { describe } from 'riteway';

import {
  createAddToArraySetter,
  createButtonHandler,
  createSelectionHandler,
  createSetter,
  createSetterWithValidation,
  createStaticSetter,
  createTextFieldSetter,
} from './redux';

describe('helpers.redux.createSetter', async assert => {
  {
    assert({
      given: 'a subslice, a state and a payload',
      should: 'return the modified state',
      actual: createSetter('name')({ name: 'Tom' }, { payload: 'Paul' }),
      expected: { name: 'Paul' },
    });
  }
});

describe('helpers.redux.createStaticSetter', async assert => {
  {
    assert({
      given: 'a subslice, a state and a payload',
      should: 'return the modified state',
      actual: createStaticSetter('name', 'Paul')({ name: 'Tom' }),
      expected: { name: 'Paul' },
    });
  }
});

describe('helpers.redux.createSetterWithValidation', async assert => {
  {
    assert({
      given: 'a subslice, a state and a valid payload',
      should: 'return the modified state and no error',
      actual: createSetterWithValidation(
        'name',
        str => {
          if (typeof str === 'string') {
            return '';
          } else {
            return 'not a string';
          }
        },
        'nameError',
      )({ name: 'Tom', nameError: '' }, { payload: 'Paul' }),
      expected: { name: 'Paul', nameError: '' },
    });

    assert({
      given: 'a subslice, a state and a invalid payload',
      should: 'return the modified state and an error',
      actual: createSetterWithValidation(
        'name',
        str => {
          if (typeof str === 'string') {
            return '';
          } else {
            return 'not a string';
          }
        },
        'nameError',
      )({ name: 'Tom', nameError: '' }, { payload: 34 }),
      expected: { name: 34, nameError: 'not a string' },
    });
  }
});

describe('helpers.redux.createAddToArraySetter', async assert => {
  {
    assert({
      given: 'a subslice, a state and a payload',
      should: 'return the modified state with added array element',
      actual: createAddToArraySetter('animals')(
        { animals: ['cat'] },
        { payload: 'dog' },
      ),
      expected: { animals: ['cat', 'dog'] },
    });
  }
});

describe('helpers.redux.createTextFieldSetter', async assert => {
  {
    assert({
      given: 'a setter and an event',
      should: 'return modified event target value',
      actual: createTextFieldSetter(a => a + 1)({ target: { value: 3 } }),
      expected: 4,
    });
  }
});

describe('helpers.redux.createButtonHandler', async assert => {
  {
    assert({
      given: 'a handler',
      should: 'return handler result',
      actual: createButtonHandler(() => 1)(),
      expected: 1,
    });
  }
});

describe('helpers.redux.createSelectionHandler', async assert => {
  {
    assert({
      given: 'a handler and a selection',
      should: 'return variable modified by handler',
      actual: createSelectionHandler(a => a)(3),
      expected: 3,
    });
  }
});
