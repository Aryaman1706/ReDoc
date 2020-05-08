const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const { User } = require('../models/users');
const { Doc } = require('../models/docs');

const auth = require('../middleware/auth');

const router=express.Router();

// get my profile
router.get('/me', auth, async(req,res)=>{
    const user= await User.findById(req.user._id);
    if(!user) res.status(404).json("user not found");
    res.json(user);
});

// create new user
router.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user = await user.save();
    res.json(user);
});

// edit my profile
router.put('/me', auth, async (req,res)=>{
    const user = await User.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        email: req.body.email
    }, { new: true });

    res.json(user);
});

// delete account
router.delete('/me', auth, async(req,res)=>{
    const user = User.findByIdAndRemove(req.user._id);
    res.json(user);
});

module.exports=router;