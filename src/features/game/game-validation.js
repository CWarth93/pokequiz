import { validate } from 'helpers/validation';
import * as yup from 'yup';

import { getTexts } from '../../locales';

const nameSchema = yup.object().shape({
  name: yup.string().min(5, getTexts()['name-error']).required(),
});

const validateName = name => validate({ name }, nameSchema);

export { validateName };
