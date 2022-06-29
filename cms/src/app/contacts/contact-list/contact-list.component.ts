import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  // in quotes is the name that was used as ref in html template
  @ViewChild('clickedContactItem', {static: false}) selectedContact: ElementRef;

  term: string;

  //Declare subscription type variable, which will hold the subscription to contacts changes
  contactChangesSubsciprtion: Subscription;

  contacts:Contact[] = [];

  constructor(private contactService: ContactService ) { }

  ngOnInit(): void {

    this.contacts = this.contactService.getContacts();

    this.contactChangesSubsciprtion = this.contactService.contactListChangedEvent.subscribe(

      // this subscription to the documentListChangedEvent receives
      // an updated array upon change in the DocumentService contacts 
      (contactsList : Contact[]) => {

        this.contacts = contactsList; // update the document we initialized in this file

      }

    );
  }

  ngOnDestroy(): void {

    // unsubscribe to the contact changes subscription to avoid data leaks
    this.contactChangesSubsciprtion.unsubscribe();
  }

  // organizer(contacts: Contact[]){

  //   const newContacts = [];

  //   // do this for each contact
  //   contacts.forEach(contact=>{

  //     // if the contact has nothing in its group array
  //     if(contact.group == null){

  //       // add contact to new contacts array
  //       newContacts.push(contact);

  //     }else{// if the contact has something in its group array
        
  //       // add contact to new contacts array
  //       newContacts.push(contact);

  //       // for each item in the contact's group array
  //       contact.group.forEach(groupie=>{

  //         // find the out if the contact has been added already to the newContacts array
  //         // Some contacts are set as child contacts(groupie) so they appear multiple times
  //         // check that each child contact has not already been added in newContacts as parent contact
  //         let index = newContacts.findIndex(contact => {

  //             // if the childContact's id matches any of the contacts already in the 
  //             // newContacts array, return true. That will result in the index of the 
  //             // contact in the newContacts array being assigned to index.
  //             if (contact.id === groupie.id) {
  //               return true;
  //             }
            
  //             // if above statement is not returned, then false is returned 
  //             // and that results in -1 being assigned index.
  //             return false;

  //         });

  //         // When the child contact is already added to the newCOntacts Array
  //         // index is not equal to -1, therefore we  remove that contact, 
  //         // so we can add it as a child contact under its parent[index orderwise]
  //         if(index !== -1){

  //           newContacts.splice(index, 1);

  //         }

  //         newContacts.push(groupie);


  //       });
  //     }

  //   });

  //   console.log(newContacts);

  //   return newContacts;

  // }

  search(value: string){
    this.term = value;
  }

}
