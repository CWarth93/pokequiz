import { describe } from 'riteway';

import { generateQuestionsWithAnswers } from './question-generator';

describe('features.game.question-generator', async assert => {
  const questionsWithAnswers = generateQuestionsWithAnswers(5, 'en', 3, 151);

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
