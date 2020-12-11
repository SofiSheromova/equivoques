const mongoose = require('mongoose');

/**
Set up mongoose connection...
 */
function setUpMongooseConnection() {
  const connectionString = process.env.MONGODB_URI;
  console.log(connectionString);
  mongoose.connect(connectionString,
      {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error',
      console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = setUpMongooseConnection;
