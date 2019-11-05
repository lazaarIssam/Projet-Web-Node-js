var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var router = express.Router();
const saltRounds = 10;
const multer = require('multer');
var upload = multer({dest: 'public/images'});
const {ensureAuthenticated} = require('../config/estathentifier')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// controller import 
var indexCont = require('../controller/index'); 
var userCont = require('../controller/user'); 
var annoCont = require('../controller/annonce');
var questionCont = require('../controller/question');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

/* GET home page. */
router.get('/', indexCont.acceuil);

/* GET Inscription */
router.get('/singupuser', userCont.inscripage );

/* GET Profil */
router.get('/profil',[ ensureAuthenticated,userCont.profilpage]);

//post user data to mydb
router.post('/signup', userCont.inscription);

/* GET Userlist page */
router.get('/userlist', userCont.listuser );

/* GET login page */
router.get('/login', userCont.loginpage);

/* POST login page */
router.post('/log', userCont.login);

/* get logout page */
router.get('/logout', [ensureAuthenticated,userCont.logout]);

/* get Annonce insert page */
router.get('/addAnn', [upload.single('myFile'),annoCont.Annon]);

/* post Annonce insert page */
router.post('/addAnnnP', [annoCont.Annonn]);
/* post Annonce insert page */
router.get('/addAnnnP', [annoCont.Annonn]);

/* Post Annonce insert page */
router.post('/insertPost',[annoCont.insererAnnonce]);

/* GET home page. */
router.get('/anonUser', [annoCont.annonceuser]);

/*  Annonce Detail page */
router.get('/detailsAnnonce/:idannonce', annoCont.detailAnnonce);

/*  Annonce Detail page */
router.get('/msgpage/:idannonce/:idclient', [questionCont.questionpage]);

/* Annonce Detail page */
router.post('/envoyermsg', [questionCont.questionAnnonce]);

/* Annonce Detail page */
router.get('/messagerieCl/:idclient', [questionCont.messagerieClient]); 

/* Annonce update page */
router.get('/updatepage/:id', [annoCont.updatep]);

/* Annonce update annonce */
router.post('/updateannonce', [annoCont.updateann]);

/* Annonce delete annonce */
router.get('/deleteannonce/:idanno/:idus', [annoCont.deleteann]);

/* Voir l'annonce */
router.get('/msgan/:idanno', [questionCont.msgannonce]);

/* Messagerie agent  */
router.get('/agentmessagerie/:idagent', [questionCont.messagerieagent]);

/* Response to client */
router.get('/resptoclient/:idann',[questionCont.restoclient])

/* response to client post */
router.post('/response', [questionCont.responseclient]);

module.exports = router;
