const mongoose = require("mongoose");
const Joi = require("joi");
const moment = require("moment");

const docSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date: {
    type: String,
    default: moment().format("lll"),
  },
  dateOrg: {
    type: Date,
    default: new Date(),
  },
});

docSchema.post("remove", async (doc, next) => {
  const { User } = require("./users");
  const fs = require("fs");
  const path = require("path");

  // delete file from uploads
  fs.unlink(
    path.resolve(__dirname, `../client/public/uploads/${doc.body}`),
    (err) => console.log(err)
  );

  let users = await User.update(
    {
      docs: doc._id,
    },
    {
      $pull: { docs: doc._id },
    },
    { multi: true }
  );
  next();
});

const Doc = mongoose.model("Doc", docSchema);

exports.Doc = Doc;
