import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

// This injectable argument replaces the need to add the provides inside 
// component.ts file or in the app.module.ts file
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // define the emitter that will emit contact array changes
  // contactChangedEvent = new EventEmitter<Contact[]>();

  // a better way to emit contact array changes
  contactListChangedEvent = new Subject<Contact[]>();

  // declare the contacts array that will hold the contacts
  contacts: Contact [] =[];

  // Maximum contact id variable
  maxContactId: number = 0;
   
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
    this.contactListChangedEvent.next(this.contacts.slice());
   }

  // fn to add a contact into the contacts array
  addcontact(newcontact: Contact) {

    // if the newcontact is not found, return
    if(!newcontact){
      return;
    }

    // increment the maxId found in the contacts array
    this.maxContactId++;

    // add the new contact into the contacts copy
    this.contacts.push(newcontact);

    // emit the changes and pass a copy of the updated contacts array
    this.contactListChangedEvent.next(this.contacts.slice());

  }

  updatecontact(originalcontact: Contact, newcontact: Contact) {

    // if the original contact or the new contact is null or undefined return
    if(!originalcontact || !newcontact){
      return;
    }

    // get the index(pos) of the original contact being updated
    let pos = this.contacts.indexOf(originalcontact);

    // if the index of the original contact is not found, return
    if(pos < 0){
      return;
    }

    // set the id of the new contact to that of the original contact being updated
    newcontact.id = originalcontact.id;

    // Use the index(pos) to uodate the contact at that position with the newcontact
    this.contacts[pos] = newcontact;

    // emit the contact changes and pass a copy of the updated contacts array
    this.contactListChangedEvent.next(this.contacts.slice())

  }

  // function to get the max id used in the contacts array by the contacts
  getMaxId(): number {

    let maxId = 0;

    // for each contact in the contacts list 
    //     currentId = convert contact.id into a number
    //     if currentId > maxId then
    //         maxId = currentId
    //     endIf
    // endFor

    this.contacts.forEach(contact=>{

      let currentId = +contact.id;

      maxId = currentId > maxId? currentId: maxId;

    });

    return maxId
  }
}
