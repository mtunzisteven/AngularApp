var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;


// query's db and finds the sequence document
function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        err.status = 500;
        err.message = 'An error occurred';
        return err;
      }

      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    });
}

// check which collection we're working with and then increment
// the max id for the corresponding collection's id in the  
// sequences collection
SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  // collection checking logic and id incrementing 
  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  // update the value in the sequence collection
  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  // return the id which will be assigned to the newly created document in:
  // documents, messages, or contacts collection
  return nextId;
}

module.exports = new SequenceGenerator();
