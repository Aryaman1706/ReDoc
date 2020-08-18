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
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  date: {
    type: String,
    default: moment().format("lll"),
  },
  dateOrg: {
    type: Date,
    default: new Date(),
  },
});

const Doc = mongoose.model("Doc", docSchema);

exports.Doc = Doc;
