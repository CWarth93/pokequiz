import _ from 'lodash';
import { is } from 'ramda';

const isNumber = is(Number);

const round = _.round;

const getRandomNumber = _.random;

export { isNumber, round, getRandomNumber };
