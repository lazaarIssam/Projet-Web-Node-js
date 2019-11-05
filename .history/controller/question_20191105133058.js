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
        "question" : quest
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
    db.collection('questioncollection').find({"client_id":idclient}, function(err,quest){
        //res.send('value : '+quest);
        res.render('messagerieClient',{'result':quest});
    });
}

/* voir l'annonce */
exports.msgannonce = function(req,res){
    var db = req.db;
    var idannonce = req.params.idanno;
    db.collection('annoncecollection').findOne({"_id":idannonce},function(err,annonce){
        res.render('details',{"result": annonce});
    });
}

/* MEssagerie agent*/
exports.messagerieagent = function(req,res){
    var db=req.db;
    var idagent = req.params.idagent;
    db.collection('questioncollection').find({"agent_id":idagent},function(err,result){
        res.render('msgAgent',{"result": result});
    });

}

/*response to client */
exports.restoclient= function(req,res){
    var db =req.db;
    var idquestion = req.params.idann;
    db.collection('questioncollection').findOne({"_id":idannonce},function(err,question){
        db.collection('usercollection').findOne({"_id":question.client_id},function(err,client){
            db.collection('annoncecollection').findOne({"_id":question.annonce_id,"user.us_id":question.agent_id},function(err,annonce){
                db.collection('responsecollection').find({"idannonce":annonce._id},function(err,response){
                    // res.render('conversation',{"question":question,"client":client,"annonce":annonce,"response":response});
                     res.json('question: '+question._id+' client: '+client._id+' annonce: '+annonce._id+' response: '+response+' idannonce: '+idannonce);
                });
            });
        });
    });
}

/* Response client post */
exports.responseclient= function(req,res){
    var db =req.db;
    var idannonce = req.body.idannonce;
    var idagent = req.body.idagent;
    var idquestion = req.body.idquestion;
    var idclient = req.body.idclient;
    var agentresponse =req.body.response;
    console.log('idannonce: '+idannonce+' idagent: '+idagent+' idquestion: '+idquestion+' idclient: '+idclient)
    db.collection('responsecollection').insert({"idannonce":idannonce,"agentresponse":agentresponse},function(err,response){
        if(err){res.send('erreur !')}
        else{
        db.collection('questioncollection').findOne({"_id":req.body.idquestion},function(err,question){
            db.collection('usercollection').findOne({"_id":req.body.idclient},function(err,client){
                db.collection('annoncecollection').findOne({"_id":req.body.idannonce,"user.us_id":req.body.idagent},function(err,annonce){
                    db.collection('responsecollection').find({"idannonce":idannonce},function(err,response){
                         res.render('conversation',{"question":question,"client":client,"annonce":annonce,"response":response});
                    });
                });
            });
        });
    }
    });
}


