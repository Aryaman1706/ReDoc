const mongoose=require('mongoose');
const Joi=require('joi');
const { Doc } = require('../models/docs');

const auth=require('../middleware/auth');

const router=express.Router();

// get my docs
router.get('/myDocs', auth, async(req,res)=>{
    res.json(req.user.docs);
});

// Create a doc
router.post('/', auth, async(req,res)=>{
    
});