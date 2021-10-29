import { startLoggingConsole, stopLoggingConsole } from 'helpers/console';
import { describe } from 'riteway';

import log from './index';

let response = {
  status: a => a,
  json: a => a,
  store: [],
};

describe('middleware.logToConsole', async assert => {
  {
    let request = {
      url: '/api/saveAnimal?type=rabbit',
      method: 'POST',
      query: {
        type: 'rabbit',
      },
      body: {
        name: 'snorr',
        age: 7,
      },
    };

    let store = [''];
    startLoggingConsole(store);
    await log({ request, response });
    stopLoggingConsole();

    assert({
      given: 'a request',
      should: 'log to console',
      actual: store[0].includes('new request') && store[0].includes('body:'),
      expected: true,
    });
  }

  {
    let request = {
      url: '/api/saveAnimal?type=rabbit',
      method: 'POST',
      query: {
        type: 'rabbit',
      },
      body: {
        name: 'snorr',
        age: 7,
      },
    };
    response.store = [{ hello: 'world' }];

    let store = [''];
    startLoggingConsole(store);
    await log({ request, response });
    stopLoggingConsole();

    assert({
      given: 'a response',
      should: 'log to console',
      actual: store[0].includes('response store:'),
      expected: true,
    });
  }
});
