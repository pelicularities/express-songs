const { MongoMemoryServer } = require("mongodb-memory-server");

module.exports = async () => {
  const mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;

  // set reference to mongo server in order to close the server during teardown
  global.__MONGOSERVER__ = mongoServer;
};
