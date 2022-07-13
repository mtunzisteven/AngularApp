var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

// Get the list of documents from the documents collection of the db
router.get('/', (req, res, next) => {

    Document.find()
        .then(FecthedDocuments => {
            res.status(200).json({documents:FecthedDocuments});
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error fetching data from the database',
                error: error
            });
        })
 });

 // Add new documents to the documents collection of the db
 router.post('/', (req, res, next) => {

  // get the next id for the new document being added
  const maxDocumentId = sequenceGenerator.nextId("documents");

  console.log(req.body);

  // create a new document using the document model
  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  // saved the newly created document and return the newly 
  // added document if successfully loaded to db
  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

// update existing documents in the documents collection of the db
router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;
  
        Document.updateOne({ id: req.params.id }, document)
          .then(result => {
            res.status(204).json({
              message: 'Document updated successfully'
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
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
});

// delete document withing the documents colection of the db
router.delete("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            Document.deleteOne({ id: req.params.id })
            .then(result => {
                res.status(204).json({
                    message: "Document deleted successfully"
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
                message: 'Document not found.',
                error: { document: 'Document not found'}
            });
        });
});

module.exports = router; 