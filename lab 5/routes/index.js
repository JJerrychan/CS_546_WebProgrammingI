const userApi = require('./userApi');

function constructor(app) {
  app.use('/', userApi);
  app.use('*', async (req, res) => {
    console.log(
      'A ' + req.method + ' for ' + req.originalUrl + ' comes from ' + req.ip
    );
    res.status(404).json({ error: 'Not found' });
  });
}

module.exports = constructor;
