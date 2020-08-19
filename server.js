// * TRY TO MAKE AS MANY OPERATIONS ASYNC AS POSSIBLE.

const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
// importing routes
const user = require("./routes/user");
const doc = require("./routes/doc");
const auth = require("./routes/auth");

const app = express();

// socket.io setup
const server = require("http").Server(app);
const io = require("socket.io")(server);

// server.listen(8080);
// socket.io setup done

app.use(express.json());

// Routes
app.use("/api/doc", doc);
app.use("/api/user", user);
app.use("/api/auth", auth);

//socket.io work -->
io.on("connection", (socket) => {
  let id;
  console.log("socket io connected...", socket.id);

  socket.on("join", (doc_id) => {
    id = doc_id;
    console.log(`room joined ${doc_id}`);
    socket.join(doc_id);

    socket.on("textChangeServer", (data) => {
      console.log(data);
      socket.broadcast.to(doc_id).emit("textChangeClient", data);
    });
  });

  socket.on("disconnect", () => {
    console.log("socket io disconnected...");
  });
});
// socket.io work done -->

// mongoose and port setup-->
mongoose
  .connect("mongodb://localhost:27017/ReDoc", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Not Connected..."));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
