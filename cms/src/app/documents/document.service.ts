import { EventEmitter, Injectable } from '@angular/core';
import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  // Will be used to emit documents array changes
  // documentChangedEvent = new EventEmitter<Document[]>();

  // Will be used to emit the selected document
  selectedDocumentEvent = new EventEmitter<Document>();

  // Better way to emit documents array
  documentListChangedEvent = new Subject<Document[]>();

  // Declare the documents array
  documents: Document[] = [];

  // variable that will hold the maxId return by the getMaxId fn
  maxDocumentId: number;

  constructor() { 
    // Initialize the documents array with the contents of MOCKDOCUMENTS
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments():Document[]{
    // return a copy of the documents array. 
    // No changes will affect the original array
    return this.documents.slice();
  } 
  
  // get a single document using an string type id
  getDocument(id: string): Document{

    // declare a Document or null type variable and assign the value of null to it
    let returnValue: Document | null = null;

    // loop through each document in the documents array
    this.documents.forEach(document => {

      // if you find a document's id that is equal to the id n the arg
      // change variable value & set it equal to that document 
      if(document.id == id ){
        
        returnValue = document;

      }
    });

    return returnValue;
  }

  // Method used to delete a document from the documents array
  deleteDocument(document: Document) {
    
    // if the document selectted for deletion is not found,
    // end the function.
    if (!document) {
        return;
    }

    // find the index of the document to delete in the 
    // documents array and assign its value to pos
    const pos = this.documents.indexOf(document);

    // if the index in pos was not found, end function
    if (pos < 0) {
        return;
    }

    // remove the document at the index(pos) given 
    this.documents.splice(pos, 1);

    // emit the changes and pass the updated documents array
    this.documentListChangedEvent.next(this.documents.slice());
  }

  // fn to add a document into the documents array
  addDocument(newDocument: Document) {

    // if the newDocument is not found, return
    if(!newDocument){
      return;
    }

    // increment the maxId found in the documents array
    this.maxDocumentId++;

    // add the new document into the documents copy
    this.documents.push(newDocument);

    // emit the changes and pass a copy of the updated documents array
    this.documentListChangedEvent.next(this.documents.slice());

  }

  updateDocument(originalDocument: Document, newDocument: Document) {

    // if the original document or the new document is null or undefined return
    if(!originalDocument || !newDocument){
      return;
    }

    // get the index(pos) of the original document being updated
    let pos = this.documents.indexOf(originalDocument);

    // if the index of the original document is not found, return
    if(pos < 0){
      return;
    }

    // set the id of the new document to that of the original document being updated
    newDocument.id = originalDocument.id;

    // Use the index(pos) to uodate the document at that position with the newDocument
    this.documents[pos] = newDocument;

    // emit the document changes and pass a copy of the updated documents array
    this.documentListChangedEvent.next(this.documents.slice())

  }

  // function to get the max id used in the documents array by the documents
  getMaxId(): number {

    let maxId = 0;

    // for each document in the documents list 
    //     currentId = convert document.id into a number
    //     if currentId > maxId then
    //         maxId = currentId
    //     endIf
    // endFor

    this.documents.forEach(document=>{

      let currentId = +document.id;

      maxId = currentId > maxId? currentId: maxId;

    });

    return maxId
  }
}
