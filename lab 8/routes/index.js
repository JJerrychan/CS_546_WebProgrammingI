const searchRoutes = require('./searchshows');
const showRoutes = require('./show');

const constructorMethod = (app) => {
  app.use('/searchshows', searchRoutes);
  app.use('/show', showRoutes);

  app.get('/', async (req, res) => {
    res.render('tvMaze/index', { title: 'Show Finder' });
  });
  app.use('*', async (req, res) => {
    res.status(404).json({ error: 'Page Not found!' });
  });
};

module.exports = constructorMethod;
