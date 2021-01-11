const mongoose = require('mongoose');

/**
Set up mongoose connection...
 */
function setUpMongooseConnection() {
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    throw new Error('Connection string is not defined. ' +
        'Set process.env.MONGODB_URI');
  }
  mongoose.connect(connectionString,
      {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error',
      console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = setUpMongooseConnection;
