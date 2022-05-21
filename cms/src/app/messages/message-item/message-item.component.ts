import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  message: Message;
  @Input() sender: string;
  @Input() msgText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
