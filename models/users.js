const mongoose=require('mongoose');
const Joi=require('joi');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
     password:{
        type: String,
        required: true
    },
    docs:{
        type: Array,
        default: []
    },
   
});

const User = mongoose.model('User', userSchema);

exports.User = User;