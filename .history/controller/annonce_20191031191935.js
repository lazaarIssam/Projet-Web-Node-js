var express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

/* GET inseretAnnonce */
exports.insertAnnon = function(req, res) {
    res.render('addAnn');
  }