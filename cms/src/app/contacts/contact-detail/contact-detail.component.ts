import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact; // receives value from one selected in the contact list.

  // ContactService, Router, and ActivatedRoute
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(

      (params: Params) =>{

        this.contact = this.contactService.getContact(params['id']);

      }

    );
  }

  // the delete contact method
  deleteContact(){

    // access the contact managed deletion method that will emit 
    // the updates and pass the updated contacts array to the contact list
    this.contactService.deleteContact(this.contact);

    // redirect to the contact list page after deletion is carried out
    this.router.navigateByUrl('/contacts');

  }

}
