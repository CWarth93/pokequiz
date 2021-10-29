const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

let params;
console.log(params);
let client;
let db;

const connect = async (userName, userPassword, cluster, dbName) => {
  try {
    params = { userName, userPassword, cluster, dbName };
    const mongoDbURI = `mongodb+srv://${userName}:${userPassword}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`;
    client = new MongoClient(mongoDbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db(dbName);
  } catch (error) {
    console.error(error);
  }
};

const disconnect = async () => {
  db = null;
  client.close();
};

const getDb = () => db;

const convertToObjectId = str => ObjectId(str);

module.exports = {
  connect,
  disconnect,
  getDb,
  convertToObjectId,
};
