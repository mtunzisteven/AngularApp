import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contactSelected: Contact; // will hold the contact object

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {

    this.contactService.contactSelectedEvent.subscribe(
      (contactEl: Contact) => {

        // assign the value of the contact, as selected and emitted in the contact list,
        // to the value of this.contactSelected so it can be used in the html template of this component
        this.contactSelected = contactEl;

      }
    );

  }

}

