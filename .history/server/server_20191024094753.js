const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const monk = require('monk');

const mongoUrl = monk('mongodb://localhost:27017/mydb');

const app = express();

//connect to db
MongoClient.connect(mongoUrl).then(()=> console.log("Connecte")).catch(error => console.log(erreur));

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});