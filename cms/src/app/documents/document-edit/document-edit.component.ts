import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model'
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  // the  unedited document
  originalDocument: Document;

  // the edited document
  document: Document = new Document('', '', '', '', '');

  // The variable that will manage edit mode
  editMode: boolean = false;

  id: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {

          this.id = params['id'];

          console.log(this.id);
          
          if(this.id == undefined || this.id === null){

            this.id = (this.documentService.getDocuments().length + 1).toString();

            this.editMode = false

            return;

          }
              
          this.originalDocument = this.documentService.getDocument(this.id);
      
          if(this.originalDocument == undefined || this.originalDocument === null){

            return;

          }

          this.editMode = true;

          console.log(JSON.parse(JSON.stringify(this.originalDocument)));

          this.document = JSON.parse(JSON.stringify(this.originalDocument));
      });

  }

  onSubmit(form: FormGroup){

    // value = form.value // get values from form’s fields
    // newDocument = new Document()
    // Assign the values in the form fields to the
    // corresponding properties in the newDocument
    // if (editMode = true) then
    //  documentService.updateDocument(originalDocument, newDocument)
    // else
    //  documentService.addDocument(newDocument)
    // endIf
    // route back to the '/documents' URL 

    const documentEditForm = form.value;

    // let newId = +this.documentService.getDocuments().length + 1;

    let newDocument = new Document(
      this.id,
      documentEditForm.name,
      documentEditForm.description,
      documentEditForm.url,
      ''
      );

    if(this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }else{
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['../../'], {relativeTo: this.route});

  }

  onCancel(){

    this.router.navigate(['../../']);
    
  }

}
