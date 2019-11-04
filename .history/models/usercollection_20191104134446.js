var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost:27017/mydb/usercollection');

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