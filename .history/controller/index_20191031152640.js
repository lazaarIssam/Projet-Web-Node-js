exports.index= function(req, res, next) {
    session = req.session;
    var db = req.db;
    var collection = db.get('annoncecollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "annoncelist" : docs,
            "sess": us_email
        });
    });
    //res.render('index', { title: 'Test' });
  }