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
var annoCont = require('../controller/annonce')
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
router.get('/logout', userCont.logout);

/* get Annonce insert page */
router.get('/addAnn', annoCont.Annon);

/* post Annonce insert page */
router.post('/addAnnnP', annoCont.Annonn);
/* post Annonce insert page */
router.get('/addAnnnP', annoCont.Annonn);

/* Post Annonce insert page */
router.post('/insertPost', annoCont.insererAnnonce);

/* GET home page. */
router.get('/dashboard', annoCont.annonceuser);


module.exports = router;
