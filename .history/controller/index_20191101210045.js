var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('express-session');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var userCont = require('../controller/user'); 

var listAnn;
exports.acceuil= function(req, res, next) {
    //session = req.session;
    var db = req.db;
    var collection = db.get('annoncecollection');
    collection.find({},{},function(e,docs){
        listAnn = docs; 
        res.render('index', { "annoncelist" : docs, "sesID": req.session.id});
        //res.render('index', { "sess": userCont.us_email});
    });
  }
  
  exports.dashboard= function(req, res, next) {
    var db = req.db;
    var collection = db.get('annoncecollection');
    collection.find({},{},function(e,docs){ 
        res.render('dashboard', { "annoncelistUser" : docs});
    });
}