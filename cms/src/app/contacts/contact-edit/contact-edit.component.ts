import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  originalContact: Contact;
   contact: Contact;
   groupContacts: Contact[] = [];
   editMode: boolean = false;
   id: string;
   
   constructor(
        private contactService: ContactService,
        private router: Router,
        private route: ActivatedRoute) {
        }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if(this.id==undefined || this.id==null){
            this.editMode = false;
            return;
          }

          this.originalContact = this.contactService.getContact(this.id);

          if(this.originalContact==undefined || this.originalContact==null){
            return;
          }

          this.editMode = true;

          // make a cope of original contact
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
    
          // if the contact is found in the groupof contacts copey 
          if(this.groupContacts['group'].indexOf(this.contact)){
            this.groupContacts = JSON.parse(JSON.stringify(this.contact));
          }
    });

  }

  addTOGroup(contact: Contact){

    if(this.groupContacts['group'].indexOf(this.contact)){
      this.groupContacts.push(contact);
    }
  }

  onSubmit(form: FormGroup){
    
  }

  onCancel(){

    this.router.navigate(['../']);

  }


}
