require('dotenv').config();

require('helpers/console.test');
require('helpers/http.test');
require('helpers/language.test');
require('helpers/number.test');
require('helpers/statistic.test');
require('helpers/redux.test');
require('helpers/validation.test');

require('middleware/log/index.test');
require('middleware/validate/index.test');

require('features/game/game-page-component.test');
require('features/game/game-reducer.test');
require('features/game/pokemon-fetcher.test');
require('features/game/question-generator.test');
