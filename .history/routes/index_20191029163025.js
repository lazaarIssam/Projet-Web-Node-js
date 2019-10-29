var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var app = express.Router();
const saltRounds = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var session;
router.use(session({
  secret: 'aaaa'
}))

/* GET home page. */
router.get('/', function(req, res, next) {
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
  res.render('login', { title: 'Hello, World!' });
});

/* POST login page */
router.post('/login', function(req, res) {
  res.end(JSON.stringify(req.body));
  var db = req.db;
  var collection = db.get('usercollection');
  if(req.body.logemail == 'issam' && req.body.logemail == 'lazaar'){
    session.id == req.body.logemail;

  }
});

module.exports = router;
