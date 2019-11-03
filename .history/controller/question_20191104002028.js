var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
const app = express();

/* POST Question */  
exports.questionAnnonce = function(req, res) {
    var db = req.db;
    var clientid = req.body.clientid;
    var annonceid = req.body.annonceid;
    var agentid = req.body.agentid;
    var quest = req.body.message;
    var objetmsg = req.body.objetmsg;
    console.log("idannonce2: "+annonceid)
    var collection = db.get('questioncollection');
    collection.insert({
        "objetmsg": objetmsg,
        "annonce_id" : annonceid,
        "client_id" : clientid,
        "agent_id" : agentid,
        "question" : quest,
        "objet_msg": objetmsg
    }, function (err, doc) {
        if (err) {
            db.collection('annoncecollection').findOne({"_id":annonceid},function(err,annonce){
                db.collection('usercollection').findOne({"_id":clientid},function(err,client){
                    res.render('question',{"annonce": annonce,"client": client});
                })
            })
        }
        else {
            db.get('annoncecollection').find({},function (e,ann){
                db.collection('usercollection').findOne({"_id":clientid},function(err,client){
                    res.render('profil',{"result":ann,"sess": client.email,"sesid": req.session.id,"iduser": client._id});
                });
              });        
        }
    });
}

/* redirect page d'envoie msg */
exports.questionpage = function(req, res) {
    var db = req.db;
    var idannonce = req.params.idannonce;
    var idclient = req.params.idclient;
    //console.log('id annonce: '+ idannonce);
    //console.log(' client : '+idclient);
    db.collection('annoncecollection').findOne({"_id":idannonce},function(err,annonce){
        db.collection('usercollection').findOne({"_id":idclient},function(err,client){
            res.render('question',{"annonce": annonce,"client": client});
            //res.send('user: '+ client.username+' annonce: '+annonce.titre);
        })
    })
}

/* redirect page msg */
exports.messagerieClient = function(req, res) {
    var db = req.db;
    var idclient = req.params.idclient;
    var clientid = req.body.clientid;
    // db.get('questioncollection') .findOne({'userid':clientid}).then(function(result){
    //     console.log('res :' +result)
    //     res.render('messagerieClient',{'result':result,"clientid": clientid});
    // });
}


