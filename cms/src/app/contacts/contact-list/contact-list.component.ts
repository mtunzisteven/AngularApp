import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  // in quotes is the name that was used as ref in html template
  @ViewChild('clickedContactItem', {static: false}) selectedContact: ElementRef;

  @Input() contacts:Contact[] = [
    new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg", null),
    new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", null)
  ];

 // create a custom event that will emit contact data up to parent
 @Output() selectedContactEvent = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit(): void {
  }

   // The custom event and data are emitted
   onSelected(contactEl: Contact){
    this.selectedContactEvent.emit(contactEl);
    this.selectedContact.nativeElement.style.background = '#f8f8f8';
  }

}
