import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

// This injectable argument replaces the need to add the provides inside 
// component.ts file or in the app.module.ts file
@Injectable({
  providedIn: 'root'
})
export class ContactService {

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
}
