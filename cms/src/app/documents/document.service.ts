import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Document} from './document.model';

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

  // firebase db url
  // url = "https://cms-project-12461-default-rtdb.firebaseio.com/documents.json";
  url = "http://localhost:3000/documents/";
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  getDocuments(){

    
    // Initialize the documents array with the contents of MOCKDOCUMENTS
    // this.documents = db documents;

    this.http
      .get(
          this.url, 
          { headers: this.headers }
        )
       // Use pipe below to get correct documents
       .pipe(map(fetchedDocuments =>{
          return fetchedDocuments['documents'];
        })) 
      .subscribe(
        // success method
        (documents: Document[]) => {

          this.documents = documents;

          this.maxDocumentId = this.getMaxId();

          this.sortAndSend();

        },
        // error method
        (error: any) => {
            console.log(error);
        } 
    );

    return this.documents.slice()

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
    
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete(this.url + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  // fn to add a document into the documents array
  addDocument(newDocument: Document) {

    if (!newDocument) {
      console.log('No new contact detected!');
      return;
    }

    // make sure id of the new Document is empty
    newDocument.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>(this.url,
      newDocument,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );

  }

  updateDocument(originalDocument: Document, newDocument: Document) {

    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    // update database
    this.http.put(this.url + originalDocument.id,
      newDocument, { headers: this.headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );

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

  // a method to add documents into the data
  storeDocuments(){
    const newDocuments = JSON.stringify(this.documents);
    this.http.put(
      this.url, 
      newDocuments,
      {
        headers: new HttpHeaders({"Content-Type":"application/json"})
      }
    )

  }

  // sort documents
  sortAndSend(){

    this.documents.sort((a, b) => {
      if(+a.id < +b.id){
        return -1;
      }else{
        return 1;
      }
    });

    this.documentListChangedEvent.next(this.documents.slice());
  }
}
