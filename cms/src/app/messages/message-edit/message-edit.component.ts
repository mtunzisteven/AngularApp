import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject', {static:false}) subject:ElementRef;

  @ViewChild('msgText', {static:false}) msgText:ElementRef;

  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit(): void {
  }

  onSendMessage(){

    let id = (this.contactService.getContacts.length +1).toString();;

    let emSubject = this.subject.nativeElement.value;
    let emText = this.msgText.nativeElement.value;

    const message = new Message(id, emSubject, emText, '7');

    this.messageService.addMessage(message);
    
  }

  onClear(){

    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';

  }

}
