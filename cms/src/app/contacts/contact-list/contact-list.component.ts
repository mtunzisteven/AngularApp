import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  // in quotes is the name that was used as ref in html template
  @ViewChild('clickedContactItem', {static: false}) selectedContact: ElementRef;

  contacts:Contact[] = [];

  constructor(private contactService: ContactService ) { }

  ngOnInit(): void {

    // assign contacts list to the copy of contacts list provided in the contact service
    this.contacts = this.contactService.getContacts();

    // we subscribe to the event emitter that monitors
    // the deletion of contacts in the contacts array
    this.contactService.contactChangedEvent.subscribe(

      // the contact array passsed to the event Emitter in contact Service
      // retrieved for use in this subscription.
      (contacts: Contact[])=>{

        // update the contacts in the contact list with the up to date 
        // contacts from the contact service
        this.contacts = contacts;

      }

    );
  }

}
