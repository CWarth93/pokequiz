import { connect, convertToObjectId, disconnect, getDb } from 'helpers/mongodb';

const handler = async ({ gameId, answers }) => {
  await connect(
    process.env.MONGODB_NAME,
    process.env.MONGODB_PASSWORD,
    process.env.MONGODB_CLUSTER,
    'pokequiz',
  );

  const game = await getDb()
    .collection('games')
    .findOne({ _id: convertToObjectId(gameId) });

  const score = answers.filter((answer, i) => answer === game.answers[i])
    .length;

  await getDb()
    .collection('games')
    .updateOne({ _id: convertToObjectId(gameId) }, { $set: { score } });

  const ladder = (
    await getDb()
      .collection('games')
      .find()
      .sort({ score: -1 })
      .limit(10)
      .toArray()
  ).map(game => ({
    name: game.name,
    score: game.score,
  }));

  await disconnect();

  return {
    score,
    ladder,
  };
};

export default handler;
