var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var router = express.Router();
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// controller import 
var indexCont = require('../controller/index'); 
var userCont = require('../controller/user'); 

var session;
var us_email='';
/*
router.use(sessions({
  secret: 'aaaa',
  resave: true,
  cookie: { secure: true },
  saveUninitialized: true
}))
*/

/* GET home page. */
router.get('/', indexCont.acceuil);

/* GET Inscription */
router.get('/singupuser', userCont.inscripage );

/* GET Profil */
router.get('/profil', userCont.profilpage);

//post user data to mydb
router.post('/signup', userCont.inscription);

/* GET Userlist page */
router.get('/userlist', userCont.listuser );

/* GET login page */
router.get('/login', userCont.loginpage);

/* POST login page */
router.post('/log', userCont.login);

/* get logout page */
router.get('/logout', function(req, res) {
  session = req.session;
  req.session.destroy;
  us_email='';
   res.redirect('/singupuser');
});

/* Redirects 
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
*/

module.exports = router;
