const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    email: String,
    userpassword: String,
    typecompte: String

    });
UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User",UserSchema);  
exports.UserSchema = UserSchema;
exports.User = User;