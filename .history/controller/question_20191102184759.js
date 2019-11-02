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
          //var db = req.db;
            db.get('annoncecollection').find({},{},function(e, docs){
              res.render("dashboard",{"listannonceuser": docs,"sesid":req.body.us_id,"sess":req.body.us_id,"u_id": req.body.us_id, "u_name": req.body.us_name, "u_email": req.body.us_email, "u_typecompte": req.body.us_typecompte});
              //res.render('dashboard',{"listannonceuser": docs,"u_id": result._id, "u_name": result.username, "u_email": result.email, "u_typecompte": result.typecompte});
            });        }
    });
}

exports.questionpage = function(req, res) {
  res.render('question',{"userid": req.body.idclient,"annonceid": req.body.idannonce,"idagent": req.body.idagent});
}

