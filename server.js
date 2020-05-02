const express=require('express');
const mongoose=require('mongoose');

const user = require('./routes/user');
const doc = require('./routes/doc');

const app=express();

app.use(express.json());

// ROUTES
app.use('/api/doc',doc);
app.use('/api/user',user);

mongoose.connect('mongodb://localhost/test')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Not Connected...'));

const port=process.env.PORT || 5000;
app.listen(port,()=> console.log(`Listening on Port ${port}...`)); 
