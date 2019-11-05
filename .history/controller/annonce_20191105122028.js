var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var multer = require('multer');
var upload = multer({dest: 'public/images'});
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
//  exports.insererAnnonce = upload.single('img'),function(req, res) {
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
      var imgg = "./public/images"+String(req.file.myFile);
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
          "photo" : imgg
      }, function (err, doc) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          }
          else {
            //var db = req.db;
              db.get('annoncecollection').find({"user.us_id": req.body.us_id},function(e, docs){
                res.render("dashboard",{"listannonceuser": docs,"sesid":req.body.us_id,"sess":req.body.us_id,"u_id": req.body.us_id, "u_name": req.body.us_name, "u_email": req.body.us_email, "u_typecompte": req.body.us_typecompte});
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
  var idannonce = req.params.idannonce;
  db.get('annoncecollection').findOne({"_id":idannonce},function(e, docs){
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
      res.render('updateAnn',{"annonce": data});
  });
}

/* update page */
exports.updateann= function(req, res) {
  var db = req.db;
  console.log('Item id: '+req.body.anoid);
  var iduser = req.body.userid;
  console.log('user id: '+iduser.toString());
  var newvalues = { $set: {titre: req.body.titre,
                          typedebien: req.body.typedebien,
                          statusPub: req.body.statusPub,
                          statusTransaction: req.body.statusTransaction,
                          desc: req.body.statusTransaction,
                          prix: req.body.prix,
                          date: req.body.date,
                          photo: 'modifier' 
                        }
                      };
  db.get('annoncecollection').update({"_id":req.body.anoid}, newvalues,function(err, data) {
    if (err) throw err; 
    db.get('annoncecollection').find({"user.us_id": iduser},function(e, docs){
       //res.json(docs);
       res.render("dashboard",{"listannonceuser": docs,"sesid":docs.user.us_id,"sess":docs.user.us_id,"u_id": docs.user.us_id, "u_name": docs.user.us_name, "u_email": docs.user.us_email, "u_typecompte": req.body.us_typecompte});
    });
  });
}

/* update page */
exports.deleteann= function(req, res) {
  var db = req.db;
  var newObjectId = new ObjectID(req.params.idanno)
  var userid = req.params.idus;
  console.log('delete item id: ' +newObjectId);
  db.collection('annoncecollection').remove({"_id":newObjectId},function(err,data){
    if (err) throw err;
    db.collection('annoncecollection').find({"user.us_id":userid},function(err,annonce){
      db.collection('usercollection').findOne({"_id":userid},function(err,userr){
        res.render('dashboard',{"listannonceuser": annonce,"u_id": userr._id, "u_name": userr.username, "u_email": userr.email, "u_typecompte": userr.typecompte});
      });
    });
  });
}
