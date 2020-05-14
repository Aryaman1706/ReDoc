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

// get a specific user
router.get('/:id',auth, async (req, res)=>{
    const user = await User.findById(req.params.id);
    if( !user ) {
        res.send("No such user found")
        return;
    };
    console.log(user);
    res.json({ name: user.name, email: user.email, _id: user._id });
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

// delete the doc id from my docs
router.put('/editMyDocs/:id', auth, async(req,res)=>{
    const length = req.user.docs.length;
    let user = await User.findById(req.user._id);
    var i;
    for(i=0; i<length; i++){
        if(user.docs[i]._id == req.params.id){
            user.docs.splice(i,1);
            user = await user.save();
            res.send(user);
            break;
        }
    }
    if(i === length){
        res.send("No such doc id found");
        console.log("not found")
    }
    
    
});

module.exports=router;