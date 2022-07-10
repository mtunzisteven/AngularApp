const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true
    }
}); // Schema is a blueprint : a definition

// Here we actually create the model and export it using the syntax: module.exports
// Post can be used as the model now anywhere outside this file with the blueprint defined here.
module.exports = mongoose.model('Post', postSchema);