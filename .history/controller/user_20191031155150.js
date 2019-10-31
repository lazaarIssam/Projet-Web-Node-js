var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var sessions = require('express-session');
const saltRounds = 10;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var us_email='';
var session;

app.use(sessions({
    secret: 'aaaa',
    resave: true,
    cookie: { secure: true },
    saveUninitialized: true
  }))