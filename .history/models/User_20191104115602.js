var mongoose = require('mongoose');
var
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: String,
    email: String,
    userpassword: String,
    typecompte: String

    });
UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User",UserSchema);  
exports.UserSchema = UserSchema;
exports.User = User;