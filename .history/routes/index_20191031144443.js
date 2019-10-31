var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var router = express.Router();
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var sessionUniqueID;
var us_email='';
router.use(sessions({
  secret: 'aaaa',
  resave: false,
  cookie: { secure: true },
  saveUninitialized: true
}))

/* GET home page. */
router.get('/', function(req, res, next) {
  session = req.session;
  var db = req.db;
  var collection = db.get('annoncecollection');
  collection.find({},{},function(e,docs){
      res.render('index', {
          "annoncelist" : docs,
          "sess": us_email
      });
  });
  //res.render('index', { title: 'Test' });
});

/* GET Inscription */
router.get('/singupuser', function(req, res) {
  res.render('singupuser', { title: 'Inscription' });
});

/* GET Profil */
router.get('/profil', (req, res) => {
  res.render('profil');
});

//post user data to mydb
router.post('/signup', function(req, res) {
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
            res.redirect("/");
        }
    });
  });
});

/* GET Userlist page */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

/* GET Annoncelist page 
router.get('/annoncelist', function(req, res) {
  var db = req.db;
  var collection = db.get('annoncecollection');
  collection.find({},{},function(e,docs){
      res.render('annoncelist', {
          "annoncelist" : docs
      });
  });
});
*/

/* GET login page */
router.get('/login', function(req, res) {
  session = req.session;
  if(session.uniqueID){
    res.redirect('/redirects');
 }
  res.render('login', {'sess': session.uniqueID});
});

/* POST login page */
router.post('/log', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  session = req.session;
  session.destroy();
  var unsermail = req.body.logemail;
  db.get('usercollection').findOne({'email':unsermail}).then( function(result) {
    if(result){
      //---------------
      try {
        if(req.body.logemail == result.email){
          //if(req.body.logpassword == result.userpassword){
            bcrypt.compare(req.body.logpassword,result.userpassword,(err, ress)=>{
            if(ress){
            sessionUniqueID = result._id;
            session
            us_email=req.body.logemail;
            //res.end('correcte ' + session.uniqueID);
            res.render('profil',{'sess': session.uniqueID});
          }else{
            //res.end('mot de passe incorrect');
            res.redirect('/redirects');
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
      res.redirect('/redirects');
    }
  //});
  });
});

/* get logout page */
router.get('/logout', function(req, res) {
  session = req.session;
  req.session.destroy;
  us_email='';
   res.redirect('/singupuser');
});

/* Redirects */
router.get('/redirects', function(req, res) {
  session = req.session;
  console.log(session.uniqueID);
  if(session.uniqueID){
     res.render('/');
     //res.render('/', { sess: session.uniqueID });
  }else{
    res.end('who are you ?' );
    //res.render('/login');
  }
});

module.exports = router;
