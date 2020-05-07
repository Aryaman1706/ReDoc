const express = require('express');
const mongoose=require('mongoose');
const Joi=require('joi');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const { Doc } = require('../models/docs');

// const auth=require('../middleware/auth');

const router=express.Router();

router.use(fileUpload());

// list all my docs
router.get('/myDocs', async(req,res)=>{
    res.json(req.user.docs);
});

// get a specific doc body
router.get('/body/:id', async(req,res)=>{
    const doc = await Doc.findById(req.params.id);
    fs.readFile(path.join(__dirname, '../client/public', doc.body) , 'utf8', function(err,data){
      res.send(data);
    });
});

// get the title of a specific doc
router.get('/title/:id',async(req,res)=>{
  const doc = await Doc.findById(req.params.id);
  res.send(doc.title);
});

// Create a new doc ---NOT WORKING---
router.post('/upload', async(req,res)=>{

  if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;
    var uploadedFileName = uuidv4() + path.extname(file.name);
  
    file.mv(`${__dirname}/client/public/uploads/${uploadedFileName}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    let doc = new Doc ({
      title: req.body.title,
      authors: req.user._id,
      body: `/uploads/${uploadedFileName}`
    });
    doc = await doc.save();

    res.json(doc);
});

// edit specific doc
router.put('/:id', async (req,res)=>{
  let doc = await Doc.findByIdAndUpdate(req.params.id,{
    title: req.body.title
  },{ new: true });

  fs.writeFile(path.join(__dirname, '../client/public', doc.body), req.body.text);
  
  doc = await doc.save();
  
  res.send(doc);
});

// delete a particular doc
router.delete('/:id', async(req,res)=>{
  const doc = await Doc.findByIdAndRemove(req.params.id);
  fs.unlink(path.join(__dirname, '../client/public', doc.body), (err) => {
    if (err) {
      console.error(err)
      return
    }
  });
})

// ---END---




module.exports=router;