import { divide, length, lift, max, min, reduce, sum } from 'ramda';

const average = lift(divide)(sum, length);

const maximum = reduce(max, -Infinity);

const minimum = reduce(min, Infinity);

export { sum, average, maximum, minimum };
