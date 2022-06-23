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

  //Declare subscription type variable, which will hold the subscription to contacts changes
  contactChangesSubsciprtion: Subscription;

  contacts:Contact[] = [];

  constructor(private contactService: ContactService ) { }

  ngOnInit(): void {

    // assign contacts list to the copy of contacts list provided in the contact service
    this.contacts = this.organizer(this.contactService.getContacts());

    // we subscribe to the event emitter that monitors
    // the deletion of contacts in the contacts array
    // we assign the subscription to the subscription type variable, so we caunsub in OnDestroy
    this.contactChangesSubsciprtion = this.contactService.contactListChangedEvent.subscribe(

      // the contact array passsed to the event Emitter in contact Service
      // retrieved for use in this subscription.
      (contactList: Contact[])=>{

        // update the contacts in the contact list with the up to date 
        // contacts from the contact service
        this.contacts = this.organizer(contactList);

      }

    );
  }

  ngOnDestroy(): void {

    // unsubscribe to the contact changes subscription to avoid data leaks
    this.contactChangesSubsciprtion.unsubscribe();
  }

  organizer(contacts: Contact[]){

    const newContacts = [];
    const indexes = [];

    contacts.forEach(contact=>{

      if(contact.group == null){

        newContacts.push(contact);

      }else{
        
        newContacts.push(contact);

        contact.group.forEach(groupie=>{

          let index = newContacts.findIndex(contact => {

            if (contact.id === groupie.id) {
              return true;
            }
          
            return false;

          });

          if(index !== -1){

            newContacts.splice(index, 1);

          }

          newContacts.push(groupie);


        });
      }

    });

    console.log(newContacts);

    return newContacts;

  }

}
