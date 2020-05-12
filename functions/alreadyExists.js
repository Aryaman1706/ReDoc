const Doc = require('../models/docs');
const mongoose = require('mongoose');

async function alreadyExists ( doc, user ) {
    console.log(user._id);
    const length = doc.authors.length;
    var i;
    for(i=0;i<length;i++){
        console.log(doc.authors[i]);
        if(doc.authors[i] == user._id) {
            console.log("match")
            return true
        };    
    }
    if(i === length) {
        return false
    };
}

module.exports = alreadyExists;