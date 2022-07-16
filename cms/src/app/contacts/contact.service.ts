import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import { map, Subject } from 'rxjs';
import {Contact} from './contact.model';

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

  // firebase db url
  // url = "https://cms-project-12461-default-rtdb.firebaseio.com/contacts.json";
  url = "http://localhost:3000/contacts/";
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    
    // Initialize the contacts array with the contents of MOCKcontactS
    // this.contacts = db contacts;

    this.http
      .get(
          this.url, 
          { headers: this.headers }
        )
       // Use pipe below to get correct contacts
       .pipe(map(fetchedContacts =>{

          return fetchedContacts['contacts'];
          
        })) 
      .subscribe(
        // success method
        (contacts: Contact[]) => {

          this.contacts = contacts;

          this.maxContactId = this.getMaxId();

          this.sortAndSend();

        },
        // error method
        (error: any) => {
            console.log(error);
        } 
      );
  }

  getContacts(){ 

    // Initialize the contacts array with the contents of MOCKcontactS
    // this.contacts = db contacts;

    this.http
      .get(
          this.url, 
          { headers: this.headers }
        )
       // Use pipe below to get correct contacts
       .pipe(map(fetchedContacts =>{

          return fetchedContacts['contacts'];

        })) 
      .subscribe(
        // success method
        (contacts: Contact[]) => {

          this.contacts = contacts;

          this.maxContactId = this.getMaxId();

          this.sortAndSend();

        },
        // error method
        (error: any) => {
            console.log(error);
        } 
      );

    return this.contacts.slice();

  } 
  
  // get a single contact using an string type id
  getContact(id: string): Contact{

    // declare a contact or null type variable and assign the value of null to it
    let returnValue: Contact | null = null;

    // loop through each contact in the contacts array
    this.contacts.forEach(contact => {

      // if you find a contact's id that is equal to the id n the arg
      // change variable value & set it equal to that contact 
      if(contact.id == id ){
        
        returnValue = contact;

      }
    });

    return returnValue;
  }

  // Method used to delete a contact from the contacts array
  deleteContact(contact: Contact) {
    
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete(this.url + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  // fn to add a contact into the contacts array
  addContact(newContact: Contact) {

    if (!newContact) {
      return;
    }

    // make sure id of the new contact is empty
    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>(this.url,
      newContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );

  }

  updateContact(originalcontact: Contact, newContact: Contact) {

    if (!originalcontact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalcontact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new contact to the id of the old contact
    newContact.id = originalcontact.id;

    // update database
    this.http.put(this.url + originalcontact.id,
      newContact, { headers: this.headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );

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

  // a method to add contacts into the db
  storeContacts(){
    const newContacts = JSON.stringify(this.contacts);
    this.http.put(
      this.url, 
      newContacts,
      {
        headers: new HttpHeaders({"Content-Type":"application/json"})
      }
    )
    .subscribe(
      () => this.contactListChangedEvent.next(this.contacts.slice())
    )
  }

  // sort contacts
  sortAndSend(){

    this.contacts.sort((a, b) => {
      if(+a.id < +b.id){
        return -1;
      }else{
        return 1;
      }
    });

    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
