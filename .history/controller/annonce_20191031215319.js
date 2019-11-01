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
      var statusPub = "publie";
      var statusTransaction = "disponible";
      var typedebien = req.body.typedebien;
      var description = req.body.description;
      var prix = req.body.prix;
      var date = req.body.dateAv;
      var img = req.file.img;
      var collection = db.get('annoncecollection');
      collection.insert({
          "titre" : titre,
          "typedebien" : typedebien,
          "statusPub" : statusPub,
          "statusTransaction" : statusTransaction,
          "desc" : description,
          "prix" : prix,
          "date" : date,
          "photo" : img
      }, function (err, doc) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          }
          else {
              res.redirect("/");
          }
      });
  }