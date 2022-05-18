const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const static = express.static(__dirname + '/static');
app.use('/static', static);

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/private', (req, res, next) => {
  if (!req.session.AuthCookie) {
    return res.status(403).render('pages/notlogin',{
      title:'not log in!'
    })
  } else {
    next();
  }
});

app.use('/', (req, res, next) => {
  const currentTime = new Date().toUTCString();
  const method = req.method;
  const route = req.originalUrl;
  const status = req.session.AuthCookie
    ? 'Authenticated User'
    : 'Non-Authenticated User';
  console.log(`[${currentTime}]: ${method} ${route} (${status})`);
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
