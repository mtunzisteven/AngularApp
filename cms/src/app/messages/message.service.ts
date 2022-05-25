import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent  = new EventEmitter<Message[]>();

  messages: Message[] = [];

  constructor() {

    this.messages = MOCKMESSAGES;

   }

   getMessages(): Message[]{
    return this.messages.slice();
   } 
   
   getMessage(id: string):Message{

    // FOR each document in the documents list
    // IF document.id equals the id THEN
    // RETURN document
    // ENDIF
    // ENDFOR
    // RETURN null

    let returnValue: Message | null;

    this.messages.forEach(message => {

      returnValue = message.id==id? message:null;

    });

    return returnValue;

   }

   addMessage(message:Message){

      this.messages.push(message);
      this.messageChangedEvent.emit(this.messages.slice());
   }
}
