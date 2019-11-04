var express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var userCont = require('../controller/user');
const {ensureAuthenticated} = require('../config/estathentifier'); 

var listAnn;
exports.acceuil= function(req, res, next) {
    //session = req.session;
    var db = req.db;
    var collection = db.get('annoncecollection');
    collection.find({},{},function(e,docs){
        listAnn = docs; 
        res.render('index', { "annoncelist" : docs});
    });
  }
 
app.get('test', ensureAuthenticated (req, res) => {
    
});  