const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
  res.json({ pong: true, time: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('Home page server running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
