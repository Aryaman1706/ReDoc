const express=require('express');
const mongoose=require('mongoose');
const moment = require('moment');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// importing models
const { Doc }  = require('./models/docs');
const { User } = require('./models/users');

// importing routes
const user = require('./routes/user');
const doc = require('./routes/doc');
const auth = require('./routes/auth');

// importing auth middleware
const authM = require('./middleware/auth');

const app=express();

// socket.io setup
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);
// socket.io setup done

app.use(express.json());

app.use(fileUpload());

// ROUTES
app.use('/api/doc',doc);
app.use('/api/user',user);
app.use('/api/auth',auth);

// upload a new doc --->
app.post('/api/upload',authM, async(req,res)=>{

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      const file = req.files.file;
      if( file.mimetype !== "text/plain" ) {
        res.send("Invalid file type");
        return
      }
      var uploadedFileName = uuidv4() + path.extname(file.name);
    
      file.mv(`${__dirname}/client/public/uploads/${uploadedFileName}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      });

      let doc = new Doc ({
        title: req.body.title,
        body: `/uploads/${uploadedFileName}`
      });
      let user = await User.findById(req.user._id);
      user.docs.push( doc._id );
    	doc.authors.push(user._id);
      
      doc = await doc.save();
      user = await user.save();
      res.json(doc);
});
// --->

// download the file -->
app.get('/api/download/:id', authM, async(req, res)=>{
  const doc = await Doc.findById(req.params.id);
  if(!doc){
    res.send("No doc found");
  } else{
    var readStream = fs.createReadStream( __dirname + '/client/public/' + doc.body );
    readStream.pipe(res);
  }
});

// -->

//socket.io work -->
io.on('connection', ( socket ) => {
  let id;
  console.log("socket io connected...",socket.id);

  socket.on('join', (doc_id) => {
    id = doc_id;
    console.log(`room joined ${doc_id}`)
    socket.join(doc_id);
    
    socket.on('textChangeServer', ( data ) => {
      console.log(data);
      socket.broadcast.to(doc_id).emit('textChangeClient', data);
    });
  });
  

  socket.on('disconnect', ()=>{
    console.log("socket io disconnected...")
  });
});
// socket.io work done -->

// mongoose and port setup-->
mongoose.connect('mongodb+srv://aryaman:aryaman@cluster0-gepgv.mongodb.net/test?retryWrites=true&w=majority')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Not Connected...'));

const port=process.env.PORT || 5000;
app.listen(port,()=> console.log(`Listening on Port ${port}...`)); 