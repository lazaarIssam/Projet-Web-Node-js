var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var sessions = require('express-session');
const saltRounds = 10;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var indexCont = require('../controller/index'); 

var us_email='';
const usercount;
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

/* GET Userlist page */
  exports.listuser = function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
  }

/* GET login page */
  exports.loginpage = function(req, res) {
    session = req.session;
    /*
    if(session.uniqueID){
      res.redirect('/redirects');
   }
   */
    res.render('login', {'sess': us_email});
  }

  /* POST login page */
  exports.login = function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    session = req.session;
    //session.destroy();
    var unsermail = req.body.logemail;
    db.get('usercollection').findOne({'email':unsermail}).then( function(result) {
      if(result){
        //---------------
        try {
          if(req.body.logemail == result.email){
            //if(req.body.logpassword == result.userpassword){
              bcrypt.compare(req.body.logpassword,result.userpassword,(err, ress)=>{
              if(ress){
              //session.uniqueID = result._id;
              us_email=req.body.logemail;
              //res.end('correcte ' + session.uniqueID);
              res.render('profil',{"sess": us_email});
            }else{
              //res.end('mot de passe incorrect');
              res.redirect('/login');
            }
          });
          }
        }
        catch(error) {
          console.error(error);
        }
        //---------------
      }else{
        //res.end('Email incorrect');
        res.redirect('/login');
      }
    //});
    });
  }
  /* get logout page */
  exports.logout = function(req, res) {
    session = req.session;
    us_email='';
     res.redirect('/');
  }