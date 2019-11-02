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
            //res.send('msg envoie !');
            // db.get('annoncecollection').find({},{},function(e, docs){
            //     res.render('question',{"userid": userid,"annonceid": idannonce,"idagent": agentid});
            // });
            db.get('annoncecollection').find({},function (e,result){
                res.render('profil',{"result":result,"sess": emailclient,"sesid": req.session.id,"iduser": userid});
              });        
        }
    });
}

/* redirect page d'envoie msg */
exports.questionpage = function(req, res) {
    console.log('id annonce: '+ req.body.idannonce);
  res.render('question',{"userid": req.body.iduser,"annonceid": req.body.idannonce,"idagent": req.body.idagent,"emailclient":req.body.emailclient});
}

/* redirect page msg */
exports.messagerieClient = function(req, res) {
    console.log('id client: '+ req.body.clientid);
    res.send('ici')
}


