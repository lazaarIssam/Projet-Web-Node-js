var express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var userCont = require('../controller/user'); 

var listAnn;
exports.acceuil= function(req, res, next) {
    //session = req.session;
    
  }