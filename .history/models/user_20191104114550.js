const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    userpassword: String
    });
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');