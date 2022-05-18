import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts:Contact[] = [
    new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg", null),
    new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", null)
  ];

 // create a custom event that will emit contact data
 @Output() contactEmitionCaught = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit(): void {
  }

   // The custom event and data are emitted
  onSelectContact(contactEl: Contact){
    this.contactEmitionCaught.emit(contactEl);
  }

}
