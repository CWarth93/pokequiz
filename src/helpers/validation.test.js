import { describe } from 'riteway';
import * as yup from 'yup';

import { validate } from './validation';

describe('helpers.validation.validate', async assert => {
  {
    const schema = yup.object({
      name: yup.string(),
      age: yup.number().min(18),
    });

    {
      assert({
        given: 'a valid object',
        should: 'return empty string',
        actual: validate({ name: 'Klaus', age: 21 }, schema),
        expected: '',
      });
    }

    {
      assert({
        given: 'an invalid object',
        should: 'return the error',
        actual: validate({ name: 'Tom', age: 17 }, schema),
        expected: 'age must be greater than or equal to 18',
      });
    }
  }

  {
    const schema = yup.object({
      email: yup.string().email('not a valid email').required(),
      password: yup
        .string()
        .required()
        .matches(/(?=.*\W)/, 'Must have a special character')
        .matches(/(?=.*[A-Z])/, 'Must have uppercase characters')
        .matches(/(?=.*[a-z])/, 'Must have lowercase characters')
        .matches(/(?=.*[0-9])/, 'Must have a number'),
    });

    assert({
      given: 'an object',
      should: 'return the error',
      actual: validate(
        { email: 'wrongemail@email', password: 'P@55word' },
        schema,
      ),
      expected: 'not a valid email',
    });

    assert({
      given: 'an object',
      should: 'return empty string',
      actual: validate(
        { email: 'correctemail@email.com', password: 'P@55word' },
        schema,
      ),
      expected: '',
    });
  }

  {
    const schema = yup.object({
      type: yup.mixed().oneOf(['cat', 'dog']).required(),
      weight: yup.number().when('type', {
        is: 'dog',
        then: yup.number().moreThan(10),
        otherwise: yup.number().moreThan(5),
      }),
      name: yup
        .string()
        .required()
        .matches(/^([^0-9]*)$/, 'Pet name should have only letters'),
    });

    assert({
      given: 'an object',
      should: 'return the error',
      actual: validate({ type: 'dog', weight: 12, name: 'Jam1e' }, schema),
      expected: 'Pet name should have only letters',
    });

    assert({
      given: 'an object',
      should: 'return empty string',
      actual: validate({ type: 'cat', weight: 6, name: 'Jon' }, schema),
      expected: '',
    });

    assert({
      given: 'an object',
      should: 'return the error',
      actual: validate({ type: 'dog', weight: 8, name: 'Mahali' }, schema),
      expected: 'weight must be greater than 10',
    });
  }
});
