import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

// This injectable argument replaces the need to add the provides inside 
// component.ts file or in the app.module.ts file
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // define the emitter that will emit contact array changes
  contactChangedEvent = new EventEmitter<Contact[]>();

  // declare the contacts array that will hold the contacts
  contacts: Contact [] =[];
   
  // create a custom event that will emit contact data up to parent
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

   getContacts(): Contact[]{
     // returning a copy of the contacts array to avoid the original being modified
     return this.contacts.slice();
   }

   getContact(id: string): Contact{

    // FOR each contact in the contacts list
    // IF contact.id equals the id THEN
    // RETURN contact
    // ENDIF
    // ENDFOR
    // RETURN null

    let returnValue: Contact;
    const BreakError = {};

    try{

      this.contacts.forEach(contact => {

        returnValue = contact.id===id? contact:null;

        if(returnValue){

          throw BreakError; // Only way to break loop

        }
      });
    }catch(err){
      if(err !== BreakError){throw err;}else{return returnValue;}
    }

    return null;

   }

   deleteContact(contact: Contact) { 
         
    // if the contact selectted for deletion is not found,
    // end the function.
    if (!contact) {
      return;
    }

    // find the index of the contact to delete in the 
    // contacts array and assign its value to pos
    const pos = this.contacts.indexOf(contact);

    // if the index in pos was not found, end function
    if (pos < 0) {
        return;
    }

    // remove the contact at the index(pos) given 
    this.contacts.splice(pos, 1);

    // emit the changes and pass the updated contacts array
    this.contactChangedEvent.emit(this.contacts.slice());
   }
}
