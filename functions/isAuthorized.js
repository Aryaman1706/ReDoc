const Doc = require('../models/docs');

async function isAuthorized ( doc, user ) {
    const length = doc.authors.length;
    var i;
    for(i=0;i<length;i++){
        if(doc.authors[i] == user._id) {
            return true
        };
        if(i === length) {
            return false
        };
    }
}

module.exports = isAuthorized;