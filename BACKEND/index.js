const express = require('express');
const cors = require('cors');
const path = require('node:path');
const fs = require('node:fs');
const mongoose = require('mongoose');
const connectToMongo = require('./db');
const { production } = require('./config');
const app = express();
app.disable('x-powered-by');
// Same-origin hosting needs no CORS setting. Allow a separate frontend only
// when its exact origin is explicitly configured on the backend.
const allowedOrigins = (process.env.FRONTEND_URL || (!production ? 'http://localhost:3000' : '')).split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '100kb' }));
app.get('/health', (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({ status: ready ? 'ok' : 'unavailable' });
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found' }));
const frontend = path.join(__dirname, '..', 'build');
if (fs.existsSync(path.join(frontend, 'index.html'))) {
  app.use(express.static(frontend));
  app.get('/{*path}', (req, res) => res.sendFile(path.join(frontend, 'index.html')));
}
if (require.main === module) {
  connectToMongo().then(() => {
    app.listen(process.env.PORT || 5000, '0.0.0.0', () => console.log('iNoteBook server is ready'));
  }).catch(() => {
    // Avoid writing database credentials from connection errors to logs.
    console.error('Database connection failed. Check MONGODB_URI and database network access.');
    process.exitCode = 1;
  });
}
module.exports = app;
