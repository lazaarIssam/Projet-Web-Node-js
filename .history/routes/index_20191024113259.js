var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test' });
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
  var password = req.body.password;
  var collection = db.get('usercollection');
  collection.insert({
      "username" : userName,
      "email" : userEmail,
      "userpassword" : password
  }, function (err, doc) {
      if (err) {
          res.send("There was a problem adding the information to the database.");
      }
      else {
          res.redirect("/singupuser");
      }
  });
});
});

/* Post addUser Function 
router.post('/adduser', function(req, res) {
  // Set DB variable
  var db = req.db;
  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  // Set our collection
  var collection = db.get('usercollection');
  // Submit to the DB
  collection.insert({
      "username" : userName,
      "email" : userEmail
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("userlist");
      }
  });
});
*/

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

module.exports = router;
