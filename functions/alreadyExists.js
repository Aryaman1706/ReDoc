const Doc = require("../models/docs");
const mongoose = require("mongoose");

async function alreadyExists(doc, user) {
  const length = doc.authors.length;
  var i;
  for (i = 0; i < length; i++) {
    if (doc.authors[i].equals(user._id)) {
      console.log("match");
      return true;
    }
  }
  if (i === length) {
    return false;
  }
}

module.exports = alreadyExists;
