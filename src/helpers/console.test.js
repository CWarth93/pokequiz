import { describe } from 'riteway';

import { startLoggingConsole, stopLoggingConsole } from './console';

describe('helpers.function.startLoggingConsole', async assert => {
  {
    let store = [''];
    startLoggingConsole(store);
    console.log('hello ');
    console.log('sir.');
    stopLoggingConsole();

    assert({
      given: 'the log of the console',
      should: 'return the logged messages',
      actual: store,
      expected: ['hello \nsir.\n'],
    });
  }
});

describe('helpers.function.stopLoggingConsole', async assert => {
  {
    let store = [''];
    startLoggingConsole(store);
    console.log('hello ');
    stopLoggingConsole();
    console.log('sir.');

    assert({
      given: 'the log of the console',
      should: 'return the logged messages',
      actual: store,
      expected: ['hello \n'],
    });
  }
});
