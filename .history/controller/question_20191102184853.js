/* POST Question */  
exports.questionAnnonce = function(req, res) {
    var db = req.db;
    var userid = req.body.idclient;
    var idannonce = req.body.idannonce;
    var agentid = req.body.idagent;
    var quest = req.body.quest;

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
            db.get('annoncecollection').find({},{},function(e, docs){
                res.render('question',{"userid": req.body.idclient,"annonceid": req.body.idannonce,"idagent": req.body.idagent});
            });        
        }
    });
}

exports.questionpage = function(req, res) {
  res.render('question',{"userid": req.body.idclient,"annonceid": req.body.idannonce,"idagent": req.body.idagent});
}

