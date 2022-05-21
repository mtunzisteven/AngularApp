import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  //  id, name, description and url
  documents: Document[] = [
    new Document('001', 'WDD330', 'Front end web development 1', 'www.byui.edu', null),
    new Document('002', 'WDD331', 'Front end web development', 'www.byui.edu', null),
    new Document('003', 'WDD440', 'Web full-stack development', 'www.byui.edu', null),
    new Document('004', 'CSE340', 'Back end web development 1', 'www.byui.edu', null),
    new Document('005', 'CSE341', 'Back end web development 2', 'www.byui.edu', null)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
