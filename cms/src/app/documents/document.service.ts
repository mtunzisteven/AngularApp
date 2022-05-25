import { EventEmitter, Injectable } from '@angular/core';
import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments():Document[]{
    return this.documents.slice();
  } 
  
  getDocument(id: string): Document{

    // FOR each document in the documents list
    // IF document.id equals the id THEN
    // RETURN document
    // ENDIF
    // ENDFOR
    // RETURN null

    let returnValue: Document | null;

    this.documents.forEach(document => {

      returnValue = document.id==id? document:null;

    });

    return returnValue;
  }
}
