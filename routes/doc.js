const express = require('express');
const mongoose=require('mongoose');
const Joi=require('joi');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const { Doc } = require('../models/docs');

const auth=require('../middleware/auth');

const router=express.Router();

router.use(fileUpload());

// list all my docs
router.get('/myDocs', auth, async(req,res)=>{
    res.send(req.user.docs);
});

// get a specific doc body
router.get('/body/:id', auth, async(req,res)=>{
    const doc = await Doc.findById(req.params.id);
    fs.readFile(path.join(__dirname, '../client/public', doc.body) , 'utf8', function(err,data){
      res.send(data);
    });
});

// get the title of a specific doc
router.get('/title/:id', auth, async(req,res)=>{
  const doc = await Doc.findById(req.params.id);
  res.send(doc.title);
});

// edit specific doc
router.put('/:id', auth, async (req,res)=>{
  let doc = await Doc.findByIdAndUpdate(req.params.id,{
    title: req.body.docTitle
  },{ new: true });

  if(req.body.docText){ 
    fs.writeFile(path.join(__dirname, '../client/public', doc.body), req.body.docText);
  };
 
  doc = await doc.save();
  
  res.send(doc);
});

// delete a particular doc
router.delete('/:id', auth, async(req,res)=>{
  const doc = await Doc.findByIdAndRemove(req.params.id);
  fs.unlink(path.join(__dirname, '../client/public', doc.body), (err) => {
    if (err) {
      console.error(err)
      return
    }
  });
  res.send(doc);
});

// ---END---
module.exports=router;