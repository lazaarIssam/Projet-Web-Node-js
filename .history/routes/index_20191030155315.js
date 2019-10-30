var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var router = express.Router();
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var session;
router.use(sessions({
  secret: 'aaaa',
  resave: false,
  saveUninitialized: true
}))

/* GET home page. */
router.get('/', function(req, res, next) {
  session = req.session;
  if(session.uniqueID){
     res.redirect('/redirects');
  }

  var db = req.db;
  var collection = db.get('annoncecollection');
  collection.find({},{},function(e,docs){
      res.render('index', {
          "annoncelist" : docs
      });
  });
  //res.render('index', { title: 'Test' });
});

/* GET Hello World page */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});
/* GET Inscription */
router.get('/singupuser', function(req, res) {
  res.render('singupuser', { title: 'Inscription' });
});
//post user data to mydb
router.post('/signup', function(req, res) {
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
});

/* GET Userlist page */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

/* GET Annoncelist page */
router.get('/annoncelist', function(req, res) {
  var db = req.db;
  var collection = db.get('annoncecollection');
  collection.find({},{},function(e,docs){
      res.render('annoncelist', {
          "annoncelist" : docs
      });
  });
});

/* GET login page */
router.get('/login', function(req, res) {
  session = req.session;
  if(session.uniqueID){
    res.redirect('/redirects');
 }
  res.render('login', { title: 'Hello, World!' });
});

/* POST login page */
router.post('/log', function(req, res) {
  //res.end(JSON.stringify(req.body));
 //bcrypt.hash(req.body.userpassword, saltRounds, function (err,   hash) {
  var db = req.db;
  var collection = db.get('usercollection');
  session = req.session;
  if(session.uniqueID){
     res.redirect('/redirects');
  }
  var unsermail = req.body.logemail;
  //var userpass = req.body.logpassword;
  db.get('usercollection').findOne({'email':unsermail}).then( function(result) {
    //if (err) throw err;
    //if(req.body.logemail == result.email && req.body.logpassword == result.userpassword){
      //session.uniqueID == req.body.logemail;
    //}
    //res.redirect('/redirects');
    //res.end('unsermail : '+result);
    if(result){
      //---------------
      try {
        if(req.body.logemail == result.email){
          if
          //res.end('correcte');
        }else{
          res.end('Email incorrect');
        }
      }
      catch(error) {
        console.error(error);
      }
      //---------------
    }else{
      res.end('erreur');
    }
  //});
  });
});

/* get logout page */
router.get('/logout', function(req, res) {
  session = req.session;
  req.session.destroy;
   res.redirect('/singupuser');
});

/* Redirects */
router.get('/redirects', function(req, res) {
  session = req.session;
  console.log(session.uniqueID);
  if(session.uniqueID){
     res.redirect('/');
  }else{
    res.end('who are you ?');
  }
});

module.exports = router;
