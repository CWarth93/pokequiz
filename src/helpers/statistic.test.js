import { describe } from 'riteway';

import { average, maximum, minimum, sum } from './statistic';

describe('helpers.statistic.sum', async assert => {
  {
    assert({
      given: 'an array of number',
      should: 'return the sum',
      actual: sum([3, 7, 11, 2]),
      expected: 23,
    });
  }
});

describe('helpers.statistic.average', async assert => {
  {
    assert({
      given: 'an array of number',
      should: 'return the average',
      actual: average([1, 3, 5]),
      expected: 3,
    });
  }
});

describe('helpers.statistic.maximum', async assert => {
  {
    assert({
      given: 'an array of number',
      should: 'return the maximum',
      actual: maximum([1, 3, 5, 2]),
      expected: 5,
    });
  }
});

describe('helpers.statistic.minimum', async assert => {
  {
    assert({
      given: 'an array of number',
      should: 'return the minimum',
      actual: minimum([1, 3, 5, 2]),
      expected: 1,
    });
  }
});
