const express = require('express');
const mongoose=require('mongoose');
const Joi=require('joi');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const { Doc } = require('../models/docs');

// middleware
const auth=require('../middleware/auth');

// functions
const isAuthorized = require('../functions/isAuthorized');

const router=express.Router();

router.use(fileUpload());

// list all my docs
router.get('/myDocs', auth, async(req,res)=>{
    res.send(req.user.docs);
});

// get a specific doc
router.get('/:id', auth, async (req, res)=> {
  const doc = await Doc.findById(req.params.id)
  if( isAuthorized( doc, req.user ) ) {
    res.send(doc);
  } else{
    res.send("You are not Autherized");
  }
});

// get a specific doc body
router.get('/body/:id', auth, async(req,res)=>{
  const doc = await Doc.findById(req.params.id);
  if( isAuthorized (doc, req.user) ) {
    fs.readFile(path.join(__dirname, '../client/public', doc.body) , 'utf8', function(err,data){
      res.send(data);
    });
  } else{
    res.send("You are not authorized");
  }
});

// get the title of a specific doc
router.get('/title/:id', auth, async(req,res)=>{
  const doc = await Doc.findById(req.params.id);
  if( isAuthorized (doc, req.user) ) {
    res.send(doc.title);
  } else{
    res.send("You are not authorized");
  }
});

// edit specific doc
router.put('/:id', auth, async (req,res)=>{
  let doc = await Doc.findById(req.params.id);
  if( isAuthorized (doc, req.user) ) {
    doc = await Doc.findByIdAndUpdate(req.params.id,{
      title: req.body.docTitle,
      date: moment().format('lll')
    },{ new: true });
    if(req.body.docText){ 
      fs.writeFile(path.join(__dirname, '../client/public', doc.body), req.body.docText);
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
  if( isAuthorized (doc, req.user) ) {
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

// ---END---
module.exports=router;