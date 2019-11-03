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
var annoCont = require('../controller/annonce');
var questionCont = require('../controller/question');

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
router.get('/anonUser', annoCont.annonceuser);

/*  Annonce Detail page */
router.get('/detailsAnnonce/:idannonce', annoCont.detailAnnonce);

/*  Annonce Detail page */
router.get('/msgpage/:idannonce/:idclient', questionCont.questionpage);

/* Annonce Detail page */
router.post('/envoyermsg', questionCont.questionAnnonce);

/* Annonce Detail page */
router.post('/messagerieCl', questionCont.messagerieClient); 

/* Annonce update page */
router.get('/updatepage/:id', annoCont.updatep);

/* Annonce update annonce */
router.post('/updateannonce', annoCont.updateann);

/* Annonce delete annonce */
router.get('/deleteannonce/:idanno/:idus', annoCont.deleteann);

module.exports = router;
