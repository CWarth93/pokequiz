import { describe } from 'riteway';

import { getRandomNumber, isNumber, round } from './number';

describe('helpers.number.isNumber', async assert => {
  {
    assert({
      given: 'a number',
      should: 'return true',
      actual: isNumber(3.127),
      expected: true,
    });
  }

  {
    assert({
      given: 'a string',
      should: 'return false',
      actual: isNumber('hamb'),
      expected: false,
    });
  }
});

describe('helpers.number.round', async assert => {
  {
    assert({
      given: 'a number',
      should: 'return the rounded number',
      actual: round(3.127, 2),
      expected: 3.13,
    });
  }
});

describe('helpers.number.getRandomNumber', async assert => {
  const random = getRandomNumber(1, 9);
  {
    assert({
      given: 'a minimum and maximum',
      should: 'return a number between',
      actual: random >= 1 && random <= 9,
      expected: true,
    });
  }
});
