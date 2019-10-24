const mongoose = require('mongoose');
const userShema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    password:{}
});