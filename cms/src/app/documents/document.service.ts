import { EventEmitter, Injectable } from '@angular/core';
import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  // Will be used to emit documents array changes
  documentChangedEvent = new EventEmitter<Document[]>();

  // Will be used to emit the selected document
  selectedDocumentEvent = new EventEmitter<Document>();

  // Declare the documents array
  documents: Document[] = [];

  constructor() { 
    // Initialize the documents array with the contents of MOCKDOCUMENTS
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments():Document[]{
    // return a copy of the documents array. 
    // No changes will affect the original array
    return this.documents.slice();
  } 
  
  getDocument(id: string): Document{

    // FOR each document in the documents list
    // IF document.id equals the id THEN
    // RETURN document
    // ENDIF
    // ENDFOR
    // RETURN null

    let returnValue: Document | null = null;

    this.documents.forEach(document => {

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
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
