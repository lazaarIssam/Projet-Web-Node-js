var express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

/* GET inseretAnnonce */
exports.Annon = function(req, res) {
    res.render('addAnn');
  }
/* POST inseretAnnonce */  
  exports.insererAnnonce = function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
      var db = req.db;
      var userName = req.body.name;
      var userEmail = req.body.email;
      var userType = req.body.typecompte;
      var collection = db.get('annoncecollection');
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