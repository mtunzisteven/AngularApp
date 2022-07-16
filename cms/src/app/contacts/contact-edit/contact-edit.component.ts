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

          this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts));

    });

  }

  addToGroup(event: any){

    const selectedContact: Contact = event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);

    if (invalidGroupContact){

       return;
    }

    this.groupContacts.push(selectedContact);
    this.contact.group = this.groupContacts;

    this.contactService.updateContact(this.originalContact, this.contact);

  }

  onSubmit(form: FormGroup){
    

    // value = form.value // get values from form’s fields
    // newContact = new Contact()
    // Assign the values in the form fields to the
    // corresponding properties in the newContact
    // if (editMode = true) then
    //  ContactService.updateContact(originalContact, newContact)
    // else
    //  ContactService.addContact(newContact)
    // endIf
    // route back to the '/Contacts' URL 

    const contactEditForm = form.value;

    let newContact = new Contact(
      this.id,
      contactEditForm.name,
      contactEditForm.email,
      contactEditForm.phone,
      contactEditForm.imageUrl,
      []
      );

    if(this.editMode){

      this.contactService.updateContact(this.originalContact, newContact)

    }else{
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['../../'], {relativeTo:this.route});

  }
  onCancel(){

    this.router.navigate(['../../'], {relativeTo:this.route});

  }

  
onRemoveItem(index: number) {

   if (index < 0 || index >= this.groupContacts.length) {
      return;
   }

   this.groupContacts.splice(index, 1);

}
  
isInvalidContact(newContact: Contact) {

    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;

}


}


