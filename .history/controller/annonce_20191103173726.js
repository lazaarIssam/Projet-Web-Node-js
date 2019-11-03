var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var userCont = require('../controller/user'); 

var us_id;
var us_name;
var us_email;
var us_typecompte;

/* GET inseretAnnonce */
exports.Annon = function(req, res) {
    res.render('addAnn');
  }
  exports.Annonn = function(req, res) {
      //console.log("us_id : "+req.body.us_id)
      us_id = req.body.us_id;
      us_name = req.body.us_name;
      us_email = req.body.us_email;
      us_typecompte = req.body.us_typecompte;
    res.render('addAnn',{"us_id": req.body.us_id,"us_name": req.body.us_name,"us_email":req.body.us_email,"us_typecompte":req.body.us_typecompte});
  }
/* POST inseretAnnonce */  
  exports.insererAnnonce = function(req, res) {
      console.log("id:: "+req.body.us_id);
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
          "user" :{
            "us_id": req.body.us_id,
            "us_name": req.body.us_name,
            "us_email": req.body.us_email,
            "us_typecompte": req.body.us_typecompte
          },
          "photo" : img,
      }, function (err, doc) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          }
          else {
            //var db = req.db;
              db.get('annoncecollection').find({},{},function(e, docs){
                res.render("dashboard",{"listannonceuser": docs,"sesid":req.body.us_id,"sess":req.body.us_id,"u_id": req.body.us_id, "u_name": req.body.us_name, "u_email": req.body.us_email, "u_typecompte": req.body.us_typecompte});
                //res.render('dashboard',{"listannonceuser": docs,"u_id": result._id, "u_name": result.username, "u_email": result.email, "u_typecompte": result.typecompte});
              });
              //res.render("dashboard",{"sesid":req.body.us_id,"sess":req.body.us_id,"u_id": req.body.us_id, "u_name": req.body.us_name, "u_email": req.body.us_email, "u_typecompte": req.body.us_typecompte});
          }
      });
  }

/* annonce of connnected user */
exports.annonceuser= function(req, res) {
  var db = req.db;
  db.get('annoncecollection').find({},{},function(e, docs){
    res.render('dashboard',{"listannonceuser": docs});
  });
}

/* annonce annonce */
exports.detailAnnonce= function(req, res) {
  var db = req.db;
  db.get('annoncecollection').find({"_id":req.body.idannonce},function(e, docs){
    res.render('details',{"result": docs});
  });
}

/* update page */
exports.updatep= function(req, res) {
  var db = req.db;
  //var myId = ObjectId(req.body.id);
  var newObjectId = new ObjectID(req.params.id)
  console.log('id annonce : '+newObjectId);
  db.get('annoncecollection').findOne({"_id":newObjectId},function(err,data){
      console.log('title: '+data.titre);
      res.render('updateAnn',{"annonce": data});
  });
}

/* update page */
exports.updateann= function(req, res) {
  var db = req.db;
  var item = {
    titre: req.body.title,
    typedebien: req.body.typedebien,
    statusPub: req.body.statusPub,
    statusTransaction: req.body.statusTransaction,
    desc: req.body.statusTransaction,
    prix: req.body.prix,
    date: req.body.date,
    photo: 'modifier'
  };
  console.log('Item id: '+req.body.anoid);
  var newObjectId = new ObjectID(req.params.anoid)
  var myid = { _id: newObjectId };
  var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
  db.get('annoncecollection').update(myid, newvalues,function(err, data) {
            console.log('data: '+data.titre);
            res.send('data: '+data);
  });
}
