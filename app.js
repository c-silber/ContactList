var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var schema = require('./models/contacts');
var userSchema = require('./models/user');
var mongo = require('mongodb');
var uri = "mongodb://contacts:collection@ds139448.mlab.com:39448/contacts";
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session')

mongoose.Promise = global.Promise;
//connection to db
//'mongodb://localhost/finalProj'
mongoose.connect(uri)
    .then(() => console.log('Connected to db'))
    .catch((err) => console.error(err));

var index = require('./routes/index');
var mailer = require('./routes/mailer');
var contacts = require('./routes/contacts');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(session({ secret: 'keyboard cat' }))

app.use('/', index);
app.use('/mailer', mailer);
app.use('/contacts', contacts);
app.use('/login', login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
