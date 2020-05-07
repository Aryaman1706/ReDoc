const mongoose=require('mongoose');
const Joi=require('joi');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

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

// generate jwt
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        email: this.email,
        name: this.name,
        password: this.password,
        docs: this.docs,
        _id: this._id
    }, keys.secretKey);
    
    return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;