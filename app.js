
require('dotenv').config()
console.log(process.env) 
require('./db');
require('./auth');

const passport = require('passport');
const express = require('express');
const path = require('path');

const routes = require('./routes/index');
const bucketlist = require('./routes/bucketlist');
const listItem = require('./routes/list-item');
const activities = require('./routes/activities');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// enable sessions

const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.get('/planner', (req, res) => {
	console.log('planner rendered');
	res.render('planner.hbs');
});
app.get('/plannersurprise', (req, res) => {
	console.log('planner rendered');
	res.render('plannersurprise.hbs');
});
app.use('/', routes);
app.use('/bucketlist', bucketlist);
app.use('/information', listItem);
app.use('/activities', activities);
//app.use('/planner', planner);

app.listen(process.env.PORT || 3000);
