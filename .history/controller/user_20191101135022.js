var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var session = require('express-session');
const saltRounds = 10;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var indexCont = require('../controller/index'); 

var us_email='';
var sessionsession;

app.use(session({
    secret: 'aaaa',
    name: 'sid',
    resave: false,
    cookie: { secure: true, sameSite: true },
    saveUninitialized: false
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
              res.redirect("/login");
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
    res.render('login', {'sess': us_email});
  }

  /* POST login page */
  exports.login = function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    sessionsession = req.session;
    var unsermail = req.body.logemail;
    db.get('usercollection').findOne({'email':unsermail}).then( function(result) {
      if(result){
        //---------------
        try {
          if(req.body.logemail == result.email){
            //if(req.body.logpassword == result.userpassword){
              bcrypt.compare(req.body.logpassword,result.userpassword,(err, ress)=>{
              if(ress){
              us_email=req.body.logemail;
              //res.end('correcte ' + session.uniqueID);
              if(result.typecompte =='agent')
              //res.render('profil',{"sess": us_email,"sesid": req.session.id});
              res.render('dashboard',{"u_id": result._id, "u_name": result.username, "u_email": result.email});
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
    sion = req.session;
    us_email='';
    req.sion.destroy();
     //res.redirect('/');
     res.send('logged out !');
  }