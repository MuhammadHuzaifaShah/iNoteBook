const mongoose = require('mongoose');
const { mongoUri } = require('./config');
module.exports = async function connectToMongo() {
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
  console.log('Connected to MongoDB');
};
