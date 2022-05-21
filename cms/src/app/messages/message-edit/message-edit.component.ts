import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  currentSender = 'Steven Mavuma';

  idAr: number[] = [];

  @ViewChild('subject', {static:false}) subject:ElementRef;

  @ViewChild('msgText', {static:false}) msgText:ElementRef;

  @Output() addMessageEvent = new EventEmitter<{}>();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(){

    let id = this.idAr.length +1;

    this.idAr.push(id);

    let emSubject = this.subject.nativeElement.value;
    let emText = this.msgText.nativeElement.value;

    const message = new Message(id, emSubject, emText, this.currentSender);

    this.addMessageEvent.emit(message);

    
  }

  onClear(){

    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';

  }

}
