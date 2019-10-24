const mongoose = require('mongoose');
const userShema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minilenghth: 5
    }
});

const User = mongoose.model('User',userShema);

module.exports = { User }