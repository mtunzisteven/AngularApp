var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

// Get the list of contacts from the contacts collection of the db
router.get('/', (req, res, next) => {

    Contact.find()
        .populate('group') // group for each contact holds _id's. This line will replace _id's with the contacts with those _id's
        .then(FecthedContacts => {
            res.status(200).json({contacts:FecthedContacts});
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error fetching data from the database',
                error: error
            });
        })
 });

// Add new contacts to the contacts collection of the db
router.post('/', (req, res, next) => {

  // get the next id for the new contact being added
  const maxcontactId = sequenceGenerator.nextId("contacts");

  // create a new contact using the contact model
  const contact = new Contact({
    id: maxcontactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: []
  });

  // saved the newly created contact and return the newly 
  // added contact if successfully loaded to db
  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

// update existing contacts in the contacts collection of the db
router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {

        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;
  
        Contact.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
                message: 'Contact updated successfully'
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
            message: 'Contact not found.',
            error: { message: 'Contact not found'}
        });
      });
});

// delete contact withing the contacts colection of the db
router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            Contact.deleteOne({ id: req.params.id })
            .then(result => {
                res.status(204).json({
                    message: "Contact deleted successfully"
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
                message: 'Contact not found.',
                error: { message: 'Contact not found'}
            });
        });
});

module.exports = router; 