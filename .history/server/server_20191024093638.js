const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const monk = require('monk');

String mongoUrl = monk('localhost:27017/mydb');

const app = express();

//connect to db
mongoose.connect(mongoUrl).then(()=> console.log("Connecte")).catch(error => console.log("Erreur"));

app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});