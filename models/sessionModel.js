const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);
// session
const store = new mongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

module.exports = store;
