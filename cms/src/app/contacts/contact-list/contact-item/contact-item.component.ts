import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../contact.model'; // accessing second layer deep path up

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

  @Input() contact: Contact; // receives value from one selected in the contact list.

  constructor() { }

  ngOnInit(): void {
  }

}


