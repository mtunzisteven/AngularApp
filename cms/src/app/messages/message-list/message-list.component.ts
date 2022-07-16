import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Message } from '../message.model'
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.messages;

    this.messageService.messageListChangedEvent.subscribe(

      (messages:Message[])=>{
        this.messages = messages;
      }

    );
  }
}
