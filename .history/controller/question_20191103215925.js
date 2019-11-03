var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
const app = express();

/* POST Question */  
exports.questionAnnonce = function(req, res) {
    var db = req.db;
    var userid = req.body.userid;
    var idannonce = req.body.annonceid;
    var agentid = req.body.idagent;
    var quest = req.body.quest;
    var emailclient = req.body.emailclient;

    var collection = db.get('questioncollection');
    collection.insert({
        "annonceid" : idannonce,
        "userid" : userid,
        "agentid" : agentid,
        "question" : quest
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            db.get('annoncecollection').find({},function (e,result){
                res.render('profil',{"result":result,"sess": emailclient,"sesid": req.session.id,"iduser": userid});
                
              });        
        }
    });
}

/* redirect page d'envoie msg */
exports.questionpage = function(req, res) {
    var db = req.db;
    var idannonce = req.params.idannonce;
    var idclient = req.params.idclient;
    console.log('id annonce: '+ idannonce);
    db.collection('annoncecollection').findOne({"_id":idannonce},function(err,annonce){
        db.collection('usercollection').findOne({"_id":idclient},function(err,client){
            res.render('question',{"clientid": client._id,"annonceid": req.body.idannonce,"idagent": req.body.idagent,"emailclient":req.body.emailclient});
            //res.send('user: '+ userr.username+' annonce: '+annonce.titre);
        })
    })
}

/* redirect page msg */
exports.messagerieClient = function(req, res) {
    var db = req.db;
    var clientid = req.body.clientid;
    // db.get('questioncollection').find({},function (e,resu){
    //     console.log('result :'+resu +' clientid: ' +clientid);
    //     res.render('messagerieClient',{"resu":resu,"clientid": clientid});
    //     req.db.close();
    //   });
    db.get('questioncollection') .findOne({'userid':clientid}).then(function(result){
        console.log('res :' +result)
        res.render('messagerieClient',{'result':result,"clientid": clientid});
    });
}


