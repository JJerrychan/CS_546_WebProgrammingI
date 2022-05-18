const bands = require('./bands');
const albums = require('./albums');

function constructor(app) {
  app.use('/bands', bands);
  app.use('/albums', albums);
  app.use('*', async (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
}

module.exports = constructor;
