const express = require('express');
const sequilize = require('./config/connection');
const path = require ('path');
const routes = require ('./controllers');

const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars
const expresshbars = require('express-handlebars')
const handlbrs = expresshbars.create({ helpers });

const sequilizeStr = require('connect-session-sequilize')(session.Store);

app.engine('handlebars', handlbrs.engine);
app.set('view engine', 'handlebars');

const sess = {
    secret: "super super secret",
    cookie: { },
    resave: false,
    saveUninitialized: true,
    store: new sequilizeStr({
      db: sequelize
    })
  };

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
