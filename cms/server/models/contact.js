const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
    group: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }] }
}); // Schema is a blueprint : a definition

// Here we actually create the model and export it using the syntax: module.exports
// Contact can be used as the model now anywhere outside this file with the blueprint defined here.
module.exports = mongoose.model('Contact', contactSchema);
