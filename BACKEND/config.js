const { randomBytes } = require('node:crypto');
const production = process.env.NODE_ENV === 'production';
if (production && (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)) {
  throw new Error('Set JWT_SECRET to a random value of at least 32 characters.');
}
if (production && !process.env.MONGODB_URI) {
  throw new Error('Set MONGODB_URI to your hosted MongoDB connection string.');
}
module.exports = {
  production,
  jwtSecret: process.env.JWT_SECRET || randomBytes(32).toString('hex'),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inotebook',
};
