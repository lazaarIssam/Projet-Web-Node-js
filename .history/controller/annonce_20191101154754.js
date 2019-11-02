var express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

var userCont = require('../controller/user'); 

/* GET inseretAnnonce */
exports.Annon = function(req, res) {
    console.log("u_id: " +res.body.us_id);
    res.render('addAnn',{"us_id": req.body.us_id,"us_name": req.body.us_name,"us_email":req.body.us_email,"us_typecompte":req.body.us_typecompte});
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
      var user = userCont.usercount;
      //var img = req.file.img;
      var img = "ppppp";
      var collection = db.get('annoncecollection');
      collection.insert({
          "titre" : titre,
          "typedebien" : typedebien,
          "statusPub" : statusPub,
          "statusTransaction" : statusTransaction,
          "desc" : description,
          "prix" : prix,
          "date" : date,
        //   "user" :{
        //     "us_id": req.body.us_id,
        //     "us_name": req.body.us_name,
        //     "us_email": req.body.us_email,
        //     "us_typecompte": req.body.us_typecompte
        //   }
          //"photo" : img
      }, function (err, doc) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          }
          else {
              res.redirect("/");
          }
      });
  }