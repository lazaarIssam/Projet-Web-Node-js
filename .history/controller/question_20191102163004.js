/* POST Question */  
exports.questionAnnonce = function(req, res) {
    console.log("id:: "+req.body.us_id);
    var db = req.db;
    var titre = req.body.titre;
    var statusPub = "publie";
    var statusTransaction = "disponible";
    var typedebien = req.body.typedebien;
    var description = req.body.description;
    var prix = req.body.prix;
    var date = req.body.dateAv;
    var user = userCont.usercount;
    //var img = req.file.img;
    var img = "ppppp";
    var collection = db.get('annoncecollection');
    collection.insert({
        "titre" : titre,
        "typedebien" : typedebien,
        "statusPub" : statusPub,
        "statusTransaction" : statusTransaction,
        "desc" : description,
        "prix" : prix,
        "date" : date,
        "user" :{
          "us_id": req.body.us_id,
          "us_name": req.body.us_name,
          "us_email": req.body.us_email,
          "us_typecompte": req.body.us_typecompte
        },
        "photo" : img,
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
          //var db = req.db;
            db.get('annoncecollection').find({},{},function(e, docs){
              res.render("dashboard",{"listannonceuser": docs,"sesid":req.body.us_id,"sess":req.body.us_id,"u_id": req.body.us_id, "u_name": req.body.us_name, "u_email": req.body.us_email, "u_typecompte": req.body.us_typecompte});
              //res.render('dashboard',{"listannonceuser": docs,"u_id": result._id, "u_name": result.username, "u_email": result.email, "u_typecompte": result.typecompte});
            });
            //res.render("dashboard",{"sesid":req.body.us_id,"sess":req.body.us_id,"u_id": req.body.us_id, "u_name": req.body.us_name, "u_email": req.body.us_email, "u_typecompte": req.body.us_typecompte});
        }
    });
}
