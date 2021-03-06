var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser')
var passport = require('passport')
var path =require('path')
// Nouveau code
var monk = require('monk');
var db = monk('localhost:27017/mydb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

require('./controller/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'aaaa',
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  resave: false,
  cookie: { secure: true, sameSite: true },
  saveUninitialized: true}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));  

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});
//passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  console.log(res);
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
