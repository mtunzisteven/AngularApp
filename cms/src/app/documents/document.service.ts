import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Document} from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  // Will be used to emit documents array changes
  // documentChangedEvent = new EventEmitter<Document[]>();

  // firebase db url
  url = "https://cms-project-12461-default-rtdb.firebaseio.com/documents.json";

  // Will be used to emit the selected document
  selectedDocumentEvent = new EventEmitter<Document>();

  // Better way to emit documents array
  documentListChangedEvent = new Subject<Document[]>();

  // Declare the documents array
  documents: Document[] = [];

  // variable that will hold the maxId return by the getMaxId fn
  maxDocumentId: number;

  constructor(private http: HttpClient) { 
    // Initialize the documents array with the contents of MOCKDOCUMENTS
    // this.documents = db documents;

    this.http
      .get(this.url)
      .subscribe(
        // success method
        (documents: Document[]) => {

            this.documents = documents;
            this.maxDocumentId = this.getMaxId();

            // sort documents
            this.documents.sort((a, b) => {
              if(+a.id < +b.id){
                return -1;
              }else{
                return 1;
              }
            });

            this.documentListChangedEvent.next(this.documents.slice());

        },
        // error method
        (error: any) => {
            console.log(error);
        } 
      );

              // success method
              // (documents: Document[] ) => {
              //     this.documents = documents
              //     this.maxDocumentId = getMaxId()
              //     sort the list of documents
              //     emit the next document list change event
              // }
              // // error method
              // (error: any) => {
              //     print the error to the console
              // } 

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

    // update db and emit the document changes
    this.storeDocuments();
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

    // update db and emit the document changes
    this.storeDocuments();

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

    // update db and emit the document changes
    this.storeDocuments();

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

  // a method to add documents intto the data
  storeDocuments(){
    const newDocuments = JSON.stringify(this.documents);
    this.http.put(
      this.url, 
      newDocuments,
      {
        headers: new HttpHeaders({"Content-Type":"application/json"})
      }
    )
    .subscribe(
      () => this.documentListChangedEvent.next(this.documents.slice())
    )
  }
}
