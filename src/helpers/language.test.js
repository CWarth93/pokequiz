import { describe } from 'riteway';

import { detect } from './language';

describe('helpers.language.detect', async assert => {
  {
    assert({
      given: 'supported languages and a default language',
      should: 'return the environment language',
      actual: detect(['en', 'de'], 'en'),
      expected: 'en',
    });
  }
});
