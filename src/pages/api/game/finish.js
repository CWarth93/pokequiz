import handler from 'features/game/finish-handler.js';
import { createMiddleware, route } from 'middleware';
import log from 'middleware/log';
import validate from 'middleware/validate';

const SCHEMA = require('middleware/validate/api.json');

export default (request, response) =>
  route(request, response, [
    log,
    validate(SCHEMA),
    createMiddleware(handler),
    log,
  ]);
