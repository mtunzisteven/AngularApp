const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    subject: { type: String },
    msgText: { 
        type: String, 
        required: true  
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Contact'
    }
}); // Schema is a blueprint : a definition

// Here we actually create the model and export it using the syntax: module.exports
// Message can be used as the model now anywhere outside this file with the blueprint defined here.
module.exports = mongoose.model('Message', messageSchema);
