import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  // variable that will hold the subscription so we can unsubscribe to it in OnDestroy
  docChangesSubscription: Subscription;

  //  id, name and url
  documents: Document[] = [];

  constructor(private documentService:DocumentService) { }

  ngOnInit(): void {

    this.documents = this.documentService.getDocuments();

    console.log(this.documents); 

    this.docChangesSubscription = this.documentService.documentListChangedEvent.subscribe(

      // this subscription to the documentListChangedEvent receives
      // an updated array upon change in the DocumentService documents 
      (documentsList : Document[]) => {

        this.documents = documentsList; // update the document we initialized in this file

      }

    );

  }

  ngOnDestroy(): void {
   
    // Unsubscribe to subscription in order to avoid memory leaks
    this.docChangesSubscription.unsubscribe();
    
  }

}
