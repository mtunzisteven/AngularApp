import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  //  id, name, description and url
  documents: Document[] = [];

  constructor(private documentService:DocumentService) { }

  ngOnInit(): void {

    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe(

      // this subscription to the documentChangedEvent receives
      // an updated array upon change in the DocumentService documents 
      (documents: Document[]) => {

        this.documents = documents; // update the document we initialized in this file

      }

    );

  }

}
