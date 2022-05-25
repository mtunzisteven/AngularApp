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
  }

   // The custom event and data are emitted
   onSelected(contactEl: Contact){
    this.contactService.contactSelectedEvent.emit(contactEl);
  }

}
