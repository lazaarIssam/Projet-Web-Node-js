const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const monk = require('monk');
const app = express();

//const mongoUrl = monk('mongodb://localhost:27017/mydb', {useNewUrlParser: true});

//connect to db
//mongoose.connect(mongoUrl).then(()=> console.log("Connecte")).catch(error => console.log(erreur));
try {
    mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true }).then(()=> console.log("Connecte !"));
  } catch (error) {
    console.log("Erreur !" +error);
    handleError(error);
  }
//Import user model 
const {User} = require('../models/user');

app.use(bodyParser.json());

//post user data to mydb
app.post('/api/user/signup', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).save((err, response)=>{
    if(err) res.status(400).send(err);
    res.status(200).send(response);
  })
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});