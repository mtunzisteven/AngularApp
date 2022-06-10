import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  document: Document;
  nativeWindow: any;

  constructor(
    private router: Router, 
    private windowRefService: WindRefService,
    private documentService: DocumentService,
    private route: ActivatedRoute
    ) { 

      this.nativeWindow = this.windowRefService.getNativeWindow();

     }

  ngOnInit(): void {

    // subscribe to the params so that when the values in params change
    // you reflect on the application.
    this.route.params.subscribe(

      // This could be of type data or pParams, it would still work. 
      // I prefer params, because it makes more sense
      (params: Params)=>{

        // Initialising the value of the currently selected document
        // to the document type variable as below. documentService used
        // to manage the access to documents.
        this.document = this.documentService.getDocument(params['id']);

      }

    );
  }

  onView(){

    // if a document has a url
    if(this.document.url){

      // openi it using the ref to windoObj created using the WindRefService
      this.nativeWindow.open(this.document.url);

    }

  }

  onDelete() {

    // delete the selected document from the documents array
    this.documentService.deleteDocument(this.document);

    // route back to documents url relative to root
    this.router.navigate(['/documents'])
 }

}
