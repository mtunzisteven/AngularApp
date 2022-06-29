import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent  = new Subject<Message[]>();

  messages: Message[] = [];

  // firebase db url
  url = "https://cms-project-12461-default-rtdb.firebaseio.com/messages.json";


  maxMessageId : number;

  constructor(private http: HttpClient) {
    this.http
    .get(this.url)
    .subscribe(
      // success method
      (messages: Message[]) => {

          this.messages = messages;
          this.maxMessageId = this.getMaxId();

          // sort messages
          this.messages.sort((a, b) => {
            if(+a.id < +b.id){
              return -1;
            }else{
              return 1;
            }
          });

          this.messageChangedEvent.next(this.messages.slice());

      },
      // error method
      (error: any) => {
          console.log(error);
      } 
    );

            // success method
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

    // update db about changes and emit the changes
    this.storeContacts();
  }

  // function to get the max id used in the messages array by the messages
  getMaxId(): number {

    let maxId = 0;

    // for each message in the messages list 
    //     currentId = convert message.id into a number
    //     if currentId > maxId then
    //         maxId = currentId
    //     endIf
    // endFor

    this.messages.forEach(message=>{

      let currentId = +message.id;

      maxId = currentId > maxId? currentId: maxId;

    });

    return maxId
  }

  // a method to add messages into the db
  storeContacts(){
    const newMessage = JSON.stringify(this.messages);
    this.http.put(
      this.url, 
      newMessage,
      {
        headers: new HttpHeaders({"Content-Type":"application/json"})
      }
    )
    .subscribe(
      () => this.messageChangedEvent.next(this.messages.slice())
    )
  }
}
