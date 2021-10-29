import { describe } from 'riteway';

import { generateQuestionsWithAnswers } from './question-generator';

describe('features.game.question-generator', async assert => {
  const questionsWithAnswers = generateQuestionsWithAnswers(5, 'en', [
    {
      id: 1,
      height: 19,
      weight: 14,
      hp: 32,
      attack: 29,
      defense: 22,
      specialAttack: 3,
      specialDefense: 15,
      speed: 29,
    },
    {
      id: 2,
      height: 17,
      weight: 13,
      hp: 41,
      attack: 22,
      defense: 32,
      specialAttack: 6,
      specialDefense: 45,
      speed: 7,
    },
  ]);

  assert({
    given: 'given an amount, a language and some pokemon',
    should: 'return the correct amount of questions',
    actual: questionsWithAnswers.length,
    expected: 5,
  });

  assert({
    given: 'given an amount, a language and some pokemon',
    should: 'return questions with answers',
    actual: questionsWithAnswers.filter(
      qwa => qwa.answer === null || qwa.answer === undefined,
    ).length,
    expected: 0,
  });
});
