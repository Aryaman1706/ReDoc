const express = require('express');
const mongoose=require('mongoose');
const Joi=require('joi');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const { Doc } = require('../models/docs');
const { User } = require('../models/users');

// middleware
const auth=require('../middleware/auth');

// functions
const isAuthorized = require('../functions/isAuthorized');
const alreadyExists = require('../functions/alreadyExists');

const router=express.Router();

router.use(fileUpload());

// list all my docs
router.get('/myDocs', auth, async(req,res)=>{
    res.send(req.user.docs);
});

// get a specific doc
router.get('/:id', auth, async (req, res)=> {
  const doc = await Doc.findById(req.params.id);
  if( await isAuthorized( doc, req.user ) === true) {
    res.send(doc);
  } else{
    res.send("You are not Autherized");
  }
});

// get a specific doc body
router.get('/body/:id', auth, async(req,res)=>{
  const doc = await Doc.findById(req.params.id);
  if( await isAuthorized (doc, req.user) === true ) { 
    fs.readFile(path.join(__dirname, '../client/public', doc.body) , 'utf8', function(err,data){
      res.json({ text: data, title: doc.title });
    });
  } else{
    res.send("You are not authorized");
  }
});

// edit specific doc
router.put('/:id', auth, async (req,res)=>{
  let doc = await Doc.findById(req.params.id);
  if( await isAuthorized (doc, req.user) === true ) {
    doc = await Doc.findByIdAndUpdate(req.params.id,{
      title: req.body.title,
      date: moment().format('lll')
    },{ new: true });
    if(req.body.text){ 
      fs.writeFile(path.join(__dirname, '../client/public', doc.body), req.body.text);
    };
    doc = await doc.save();
    res.send(doc);
  } else{
    res.send("You are not authorized");
  }
});

// delete a particular doc
router.delete('/:id', auth, async(req,res)=>{
  let doc = await Doc.findById(req.params.id);
  if( await isAuthorized (doc, req.user) === true ) {
    doc = await Doc.findByIdAndRemove(req.params.id);
    fs.unlink(path.join(__dirname, '../client/public', doc.body), (err) => {
      if (err) {
        console.error(err)
        return
      }
    });
    res.send(doc);
  } else{
    res.send("You are not authorized");
  }
});

// add authors
router.put('/authors/:id', auth, async(req,res)=>{
  let doc = await Doc.findById (req.params.id);
  if( await isAuthorized (doc, req.user) === true ) {
    let user = await User.findOne({ email: req.body.email });
    if( !user ) {
      res.send("No such user exists");
      return
    };
    if( await alreadyExists(doc, user) === false ){
      
      user.docs.push(doc._id);
      doc.authors.push( user._id );
      
      doc = await doc.save();
      user = await user.save();
      res.send(doc);
  } else {
    res.send("user already exists");
  }
  } else {
    res.send("You are not authorized");
  }
})

// ---END---
module.exports=router;