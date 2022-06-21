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
    this.contacts = this.contactService.getContacts();

    // // sort contacts by id
    // this.contacts = this.contacts.sort((n1,n2) => {
    //     if (+n1.id > +n2.id) {
    //         return 1;
    //     }
    
    //     if (+n1.id < +n2.id) {
    //         return -1;
    //     }
    
    //     return 0;
    // });

    // we subscribe to the event emitter that monitors
    // the deletion of contacts in the contacts array
    // we assign the subscription to the subscription type variable, so we caunsub in OnDestroy
    this.contactChangesSubsciprtion = this.contactService.contactListChangedEvent.subscribe(

      // the contact array passsed to the event Emitter in contact Service
      // retrieved for use in this subscription.
      (contactList: Contact[])=>{

        // update the contacts in the contact list with the up to date 
        // contacts from the contact service
        this.contacts = contactList;

      }

    );
  }

  ngOnDestroy(): void {

    // unsubscribe to the contact changes subscription to avoid data leaks
    this.contactChangesSubsciprtion.unsubscribe();
  }

}
