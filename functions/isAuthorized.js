const Doc = require("../models/docs");

function isAuthorized(doc, user) {
  const length = doc.authors.length;
  var i;
  for (i = 0; i < length; i++) {
    if (doc.authors[i].equals(user._id)) {
      return true;
    }
  }
  if (i === length) {
    return false;
  }
}

module.exports = isAuthorized;
