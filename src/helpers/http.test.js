import { describe } from 'riteway';

import { sendRequest } from './http';

describe('helpers.http.sendRequest', async assert => {
  {
    const res = await sendRequest({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/todos/1',
    });

    assert({
      given: 'a valid request to jsonplaceholder dummy api',
      should: 'return correct response',
      actual: res,
      expected: {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
    });
  }

  {
    let res;
    let error = false;

    try {
      res = await sendRequest({
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/todos/1',
      });
      console.log(res);
    } catch (e) {
      console.error(e);
      error = true;
    }

    assert({
      given: 'an invalid request to jsonplaceholder dummy api',
      should: 'throw error',
      actual: error,
      expected: true,
    });
  }
});
