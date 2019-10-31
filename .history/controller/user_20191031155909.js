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

  /* GET inscription */
  exports.inscripage = function(req, res) {
    res.render('singupuser', { title: 'Inscription' });
  }

/* GET Profil */
  exports.profilpage = function(req, res) {
    res.render('profil');
  }
/* POST Inscription */
  exports.inscription = function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
      var db = req.db;
      var userName = req.body.name;
      var userEmail = req.body.email;
      var userType = req.body.typecompte;
      var collection = db.get('usercollection');
      collection.insert({
          "username" : userName,
          "email" : userEmail,
          "userpassword" : hash,
          "typecompte" : userType
      }, function (err, doc) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          }
          else {
              res.redirect("/");
          }
      });
    });
  }