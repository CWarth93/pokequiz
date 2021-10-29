import { connect, disconnect, getDb } from 'helpers/mongodb';

import { generateQuestionsWithAnswers } from './question-generator';

const handler = async ({ name, language }) => {
  const questionsWithAnswers = await generateQuestionsWithAnswers(
    15,
    language,
    3,
    151,
  );

  await connect(
    process.env.MONGODB_NAME,
    process.env.MONGODB_PASSWORD,
    process.env.MONGODB_CLUSTER,
    'pokequiz',
  );

  const { insertedId } = await getDb()
    .collection('games')
    .insertOne({
      name,
      answers: questionsWithAnswers.map(qwa => qwa.answer),
      score: 0,
    });

  await disconnect();

  return {
    gameId: insertedId,
    questions: questionsWithAnswers.map(qwa => ({
      text: qwa.text,
      options: qwa.options,
    })),
  };
};

export default handler;
