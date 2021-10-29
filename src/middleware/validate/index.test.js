import { describe } from 'riteway';

import _validate from './index';
import SCHEMA from './mock.json';
const validate = _validate(SCHEMA);

describe('middleware.validateFromOpenApi', async assert => {
  {
    const request = {
      url: '/api/pets',
      method: 'GET',
      query: {},
      body: {},
    };

    const response = {
      status: a => a,
      json: a => a,
      store: [],
    };

    const validationResult = await validate({ request, response });

    assert({
      given: 'a valid request with all fields',
      should: 'return request and response',
      actual: validationResult,
      expected: { request, response },
    });
  }

  {
    const request = {
      url: '/api/petts',
      method: 'POST',
      query: {},
      body: {},
    };

    const response = {
      status: a => a,
      json: a => a,
      store: [],
    };

    const validationResult = await validate({ request, response });

    assert({
      given: 'an invalid request with the wrong url',
      should: 'return the error',
      actual: validationResult,
      expected: {
        request,
        response: {
          ...response,
          store: [{ error: 'url doesnt exist' }, { statusCode: 400 }],
        },
      },
    });
  }

  {
    const request = {
      url: '/api/pets',
      method: 'POST',
      query: {},
      body: {
        name: 'dieter',
        tag: 'ditti01',
      },
    };

    const response = {
      status: a => a,
      json: a => a,
      store: [],
    };

    const validationResult = await validate({ request, response });

    assert({
      given: 'a valid request',
      should: 'return request and response',
      actual: validationResult,
      expected: { request, response },
    });
  }

  {
    const request = {
      url: '/api/pets',
      method: 'POST',
      query: {},
      body: {},
    };

    const response = {
      status: a => a,
      json: a => a,
      store: [],
    };

    const validationResult = await validate({ request, response });

    assert({
      given: 'an invalid request with missing property in body',
      should: 'return the error',
      actual: validationResult,
      expected: {
        request,
        response: {
          ...response,
          store: [
            { error: "body must have required property 'name'" },
            { statusCode: 400 },
          ],
        },
      },
    });
  }
});
