import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Message } from '../message.model'

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(100, 'Starting Test', 'This is a test message to see if the messages are being loaded', 'Steven Mavuma'),
    new Message(110, 'Starting Test2', 'This is a second test message to see if the messages are being loaded', 'Steven Mavuma'),
    new Message(111, 'Starting Test3', 'This is a third test message to see if the messages are being loaded', 'Steven Mavuma')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){

    this.messages.push(message);

  }

}
