const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

const BUNDLE_DIR = path.join(__dirname, '..', 'bundle');

app.get('/ping', (req, res) => {
  res.json({ pong: true, time: new Date().toISOString() });
});

if (fs.existsSync(BUNDLE_DIR)) {
  app.use(express.static(BUNDLE_DIR));
  app.get('/', (req, res) => {
    res.sendFile(path.join(BUNDLE_DIR, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Home page of Antti. The server running with new changes!3');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
