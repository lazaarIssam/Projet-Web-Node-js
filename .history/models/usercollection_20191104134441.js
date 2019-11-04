var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost:27017/mydb/usercollection');
mongoose.connect('mongodb://localhost:27017/mydboverhere/table_one');

var usercollection = new Schema({
    username: String,
    email: String,
    userpassword: String,
    typecompte: String

    });
    usercollection.plugin(passportLocalMongoose);
var User = mongoose.model("User",usercollection);  
exports.usercollection = usercollection;
exports.User = User;