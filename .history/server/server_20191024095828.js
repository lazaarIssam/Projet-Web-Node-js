const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const monk = require('monk');
const app = express();

//const mongoUrl = monk('mongodb://localhost:27017/mydb', {useNewUrlParser: true});
try {
    await mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });
  } catch (error) {
    handleError(error);
  }

//connect to db
//mongoose.connect(mongoUrl).then(()=> console.log("Connecte")).catch(error => console.log(erreur));

app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});