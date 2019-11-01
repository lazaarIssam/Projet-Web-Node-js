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
      var db = req.db;
      var titre = req.body.titre;
      var typedebien = req.body.typedebien;
      var description = req.body.description;
      var prix = req.body.prix;
      var collection = db.get('annoncecollection');
      collection.insert({
          "titre" : titre,
          "typedebien" : typedebien,
          "statusPub" : 'publie',
          "statusTransaction" : 'disponible',
          "desc" : description,
          "prix" : 
      }, function (err, doc) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          }
          else {
              res.redirect("/");
          }
      });
  }