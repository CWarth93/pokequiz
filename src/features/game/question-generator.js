import { getRandomNumber } from 'helpers/number';

import { getRandomPokemons } from './pokemon-fetcher';

Array.prototype.hasMin = function (attrib) {
  return (
    (this.length &&
      this.reduce(function (prev, curr) {
        return prev[attrib] < curr[attrib] ? prev : curr;
      })) ||
    null
  );
};

Array.prototype.hasMax = function (attrib) {
  return (
    (this.length &&
      this.reduce(function (prev, curr) {
        return prev[attrib] >= curr[attrib] ? prev : curr;
      })) ||
    null
  );
};

const questions = [
  {
    text: 'question-id-min',
    handler: pokemons => pokemons.hasMin('id'),
  },
  {
    text: 'question-id-max',
    handler: pokemons => pokemons.hasMax('id'),
  },
  {
    text: 'question-height-min',
    handler: pokemons => pokemons.hasMin('height'),
  },
  {
    text: 'question-height-max',
    handler: pokemons => pokemons.hasMax('height'),
  },
  {
    text: 'question-weight-min',
    handler: pokemons => pokemons.hasMin('weight'),
  },
  {
    text: 'question-weight-max',
    handler: pokemons => pokemons.hasMax('weight'),
  },
  {
    text: 'question-hp-min',
    handler: pokemons => pokemons.hasMin('hp'),
  },
  {
    text: 'question-hp-max',
    handler: pokemons => pokemons.hasMax('hp'),
  },
  {
    text: 'question-attack-min',
    handler: pokemons => pokemons.hasMin('attack'),
  },
  {
    text: 'question-attack-max',
    handler: pokemons => pokemons.hasMax('attack'),
  },
  {
    text: 'question-defense-min',
    handler: pokemons => pokemons.hasMin('defense'),
  },
  {
    text: 'question-defense-max',
    handler: pokemons => pokemons.hasMax('defense'),
  },
  {
    text: 'question-special-attack-min',
    handler: pokemons => pokemons.hasMin('specialAttack'),
  },
  {
    text: 'question-special-attack-max',
    handler: pokemons => pokemons.hasMax('specialAttack'),
  },
  {
    text: 'question-special-defense-min',
    handler: pokemons => pokemons.hasMin('specialDefense'),
  },
  {
    text: 'question-special-defense-max',
    handler: pokemons => pokemons.hasMax('specialDefense'),
  },
  {
    text: 'question-speed-min',
    handler: pokemons => pokemons.hasMin('speed'),
  },
  {
    text: 'question-speed-max',
    handler: pokemons => pokemons.hasMax('speed'),
  },
];

const generateQuestionsWithAnswers = async (
  amountOfQuestions,
  language,
  amountOfPokemons,
  maxPokedexId,
) => {
  const { table } = require('../../locales/' + language + '.js');
  let questionsWithAnswers = [];
  for (let i = 0; i < amountOfQuestions; i++) {
    const randomNumber = getRandomNumber(0, questions.length - 1);
    const pokemons = await getRandomPokemons(amountOfPokemons, maxPokedexId);
    questionsWithAnswers.push({
      text: table[questions[randomNumber].text],
      options: pokemons.map(pokemon => pokemon.id),
      answer: questions[randomNumber].handler(pokemons).id,
    });
  }
  return questionsWithAnswers;
};

export { generateQuestionsWithAnswers };
