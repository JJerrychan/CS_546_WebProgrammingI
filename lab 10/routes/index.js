const users = require('../data/users');

const constructorMethod = (app) => {
  app.get('/', async (req, res) => {
    if (req.session.AuthCookie) res.redirect('/private');
    else
      res.render('pages/login', {
        title: 'Simple Authentication Application',
      });
  });

  app.get('/signup', async (req, res) => {
    if (req.session.AuthCookie) res.redirect('/private');
    else
      res.render('pages/signup', {
        title: 'Signup',
      });
  });

  app.post('/signup', async (req, res) => {
    try {
      let username = req.body.username;
      let password = req.body.password;
      if (!username || !password)
        throw 'username and password must be supplied!';
      username = username.trim().toLowerCase();
      password = password.trim();
      if (username.length < 4)
        throw 'length of username must at least 4 charaters!';
      if (password.search(' ') != -1)
        throw 'it must not contain any spaces in password!';
      if (password.length < 6)
        throw 'length of password must at least 6 charaters!';
      let dbReturn = await users.createUser(username, password);
      if (dbReturn.userInserted) res.redirect('/');
      else
        res.status(500).render('pages/signup', {
          title: 'Signup',
          error: 'Internal Server Error',
        });
    } catch (e) {
      res.status(400).render('pages/signup', {
        title: 'Signup',
        error: e,
      });
    }
  });

  app.post('/login', async (req, res) => {
    try {
      let username = req.body.username;
      let password = req.body.password;
      if (!username || !password)
        throw 'username and password must be supplied!';
      username = username.trim().toLowerCase();
      password = password.trim();
      if (username.length < 4)
        throw 'length of username must at least 4 charaters!';
      if (password.search(' ') != -1)
        throw 'it must not contain any spaces in password!';
      if (password.length < 6)
        throw 'length of password must at least 6 charaters!';
      let dbReturn = await users.checkUser(username, password);
      if (dbReturn.authenticated) {
        req.session.AuthCookie = { username: username };
        res.redirect('/private');
      } else
        res.status(500).render('pages/login', {
          title: 'Simple Authentication Application',
          error: 'Internal Server Error',
        });
    } catch (e) {
      res.status(400).render('pages/login', {
        title: 'Simple Authentication Application',
        error: e,
      });
    }
  });

  app.get('/private', async (req, res) => {
    let username = req.session.AuthCookie.username;
    res.render('pages/private', {
      title: 'private',
      user: username,
    });
  });

  app.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('pages/logout', {
      title: 'logout',
    });
  });

  app.use('*', async (req, res) => {
    res.status(404).json({ error: 'Page Not found!' });
  });
};

module.exports = constructorMethod;
