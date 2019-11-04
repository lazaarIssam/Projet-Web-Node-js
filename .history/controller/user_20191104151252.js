var express = require('express');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongodb');
var passport = require('passport');
var ObjectID = require('mongodb').ObjectID;
const saltRounds = 10;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var indexCont = require('../controller/index'); 

var us_email='';
var sessionsession;

app.use(session({
    secret: 'aaaa',
    name: 'sid',
    resave: false,
    cookie: { secure: true, sameSite: true, maxAge: 24*60*60*1000 },
    saveUninitialized: false
  }))

  /* GET inscription */
  exports.inscripage = function(req, res) {
    res.render('singupuser', { title: 'Inscription' });
  }

/* GET Profil */
  exports.profilpage = function(req, res) {
    res.render('profil');
  }

/* POST Inscription */
  exports.inscription = function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
      var db = req.db;
      var userName = req.body.name;
      var userEmail = req.body.email;
      var userType = req.body.typecompte;
      var collection = db.get('usercollection');
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
              res.redirect("/login");
          }
      });
    });
  }

/* GET Userlist page */
  exports.listuser = function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
  }

/* GET login page */
  exports.loginpage = function(req, res) {
    res.render('login', {'sess': us_email});
  }

  /* POST login page */
  
  exports.l = function(req, res) {
    var db = req.db;
    var collectionuser = db.get('usercollection');
    var collectionannonce = db.get('annoncecollection');
    sessionsession = req.session;
    var unsermail = req.body.email;
    collectionuser.findOne({'email':unsermail}).then( function(result) {
      if(result){
        //---------------
        try {
          if(req.body.email == result.email){
            //if(req.body.logpassword == result.userpassword){
              bcrypt.compare(req.body.password,result.userpassword,(err, ress)=>{
              if(ress){
              us_email=req.body.email;
              iduser=result._id;
              req.session.save();
              var resultid= result._id;
              if(result.typecompte =='agent'){
              //res.render('profil',{"sess": us_email,"sesid": req.session.id});
              //res.render('dashboard');
              var newObjectId = new ObjectID(result._id)
              console.log('agentid: '+resultid);
                  //collectionannonce.find({where: {'typedebien': 'location'}},{},function(err,item){
                      collectionannonce.find({"user.us_id": result._id.toString()},function(err,item){        
                  console.log('item123: '+ item);
                  if (err) throw err;
                //db.get('annoncecollection').find({},function(e, item){
                res.render('dashboard',{"listannonceuser": item,"u_id": result._id, "u_name": result.username, "u_email": result.email, "u_typecompte": result.typecompte});
                req.db.close();
              });
              //res.render('dashboard',{"u_id": result._id, "u_name": result.username, "u_email": result.email, "u_typecompte": result.typecompte});
              }if(result.typecompte =='client'){
                collectionannonce.find({},function (e,result){
                  res.render('profil',{"result":result,"sess": us_email,"sesid": req.session.id,"iduser": iduser});
                  req.db.close();
                });
              //res.render('profil',{"sess": us_email,"sesid": req.session.id,"sesname": req.session._id});
              }
            }else{
              //res.end('mot de passe incorrect');
              res.redirect('/login');
            }
          });
          }
        }
        catch(error) {
          console.error(error);
        }
        //---------------
      }else{
        //res.end('Email incorrect');
        res.redirect('/login');
      }
    //});
    });
  }
  
/* Login Passport */
exports.login = function(req, res,next) {
  var db = req.db;
  var useremail = req.body.email;
  passport.authenticate('local', {
    successRedirect: db.get('usercollection').findOne({"email":useremail},function(err,user){
      db.get('annoncecollection').find({"user.us_id":user._id.toString()},function(err,annonce){
        if(user.typecompte=='agent'){
          res.render('dashboard',{"result":annonce,"sess": user.email,"sesid": req.session.id,"iduser": user._id});
        }
      })
    }),
    failureRedirect: '/',
})(req, res, next);
} 

  /* get logout page */
  exports.logout = function(req, res) {
    // req.session.destroy();
    // res.redirect('/');
    req.logout();
    res.redirect('/');
  }