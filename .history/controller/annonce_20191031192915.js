var express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

/* GET inseretAnnonce */
exports.Annon = function(req, res) {
    res.render('addAnn');
  }