const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    email: String,
    userpassword: String,
    typecompte: String

    });
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');