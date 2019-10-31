var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var sessions = require('express-session');
const saltRounds = 10;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var us_email='';

exports.acceuil= function(req, res, next) {
    //session = req.session;
    var db = req.db;
    var collection = db.get('annoncecollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "annoncelist" : docs,
            "sess": us_email
        });
    });
  }