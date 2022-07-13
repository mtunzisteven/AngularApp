const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    id: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    children: {
        type: [],
        required: false
    }
}); // Schema is a blueprint : a definition

// Here we actually create the model and export it using the syntax: module.exports
// Document can be used as the model now anywhere outside this file with the blueprint defined here.
module.exports = mongoose.model('Document', documentSchema);
