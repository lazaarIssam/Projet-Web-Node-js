const mongoose = require('mongoose');
const userShema = mongoose.Schema({
    username:{
        type: String,
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