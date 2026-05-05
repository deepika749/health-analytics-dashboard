const app = require('../backend/index');

app.get('/api', (req, res) => {
  res.send('API is working 🚀');
});

module.exports = app;
