var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

// Get the list of messages from the messages collection of the db
router.get('/', (req, res, next) => {

    Message.find()
        .then(Fecthedmessages => {

          res.status(200).json({messages:Fecthedmessages});

        })
        .catch(error => {
          res.status(500).json({
              message: 'Error fetching data from the database',
              error: error
          });
        })
 });

 // Add new messages to the messages collection of the db
 router.post('/', (req, res, next) => {

  // get the next id for the new message being added
  const maxMessageId = sequenceGenerator.nextId("messages");

  // create a new message using the message model
  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  // saved the newly created message and return the newly 
  // added message if successfully loaded to db
  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        message: createdMessage
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

// update existing messages in the messages collection of the db
router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        message.subject = req.body.subject;
        message.msgText = req.body.msgText;
        message.sender = req.body.sender;
  
        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'Message updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
});

// delete message withing the messages colection of the db
router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            Message.deleteOne({ id: req.params.id })
            .then(result => {
                res.status(204).json({
                    message: "Message deleted successfully"
                });
            })
            .catch(error => {
                    res.status(500).json({
                    message: 'An error occurred',
                    error: error
                });
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Message not found.',
                error: { message: 'Message not found'}
            });
        });
});

module.exports = router; 