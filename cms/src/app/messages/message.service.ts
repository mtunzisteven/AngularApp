import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { ContactService } from '../contacts/contact.service';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageListChangedEvent  = new Subject<Message[]>();

  messages: Message[] = [];

  maxMessageId : number;

  // url = "https://cms-project-12461-default-rtdb.firebaseio.com/messages.json";
  url = "http://localhost:3000/messages/";
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private contactService: ContactService
    ) { 
    // Initialize the messages array with the contents of MOCKmessageS
    // this.messages = db messages;

    this.http
      .get(
          this.url, 
          { headers: this.headers }
        )
       // Use pipe below to get correct messages
       .pipe(map(fetchedmessages =>{

          return this.senderCorrection(fetchedmessages);

        })) 
      .subscribe(
        // success method
        (messages: Message[]) => {

          this.messages = messages;

          this.maxMessageId = this.getMaxId();

          this.sortAndSend();

        },
        // error method
        (error: any) => {
            console.log(error);
        } 
      );

              // success method
              // (messages: Message[] ) => {
              //     this.messages = messages
              //     this.maxMessageId = getMaxId()
              //     sort the list of messages
              //     emit the next message list change event
              // }
              // // error method
              // (error: any) => {
              //     print the error to the console
              // } 

  }

  getMessages(){

      return this.messages.slice()

  } 
  
  // get a single message using an string type id
  getMessage(id: string): Message{

    // declare a message or null type variable and assign the value of null to it
    let returnValue: Message | null = null;

    // loop through each message in the messages array
    this.messages.forEach(message => {

      // if you find a message's id that is equal to the id n the arg
      // change variable value & set it equal to that message 
      if(message.id == id ){
        
        returnValue = message;

      }
    });

    return returnValue;
  }

  // Method used to delete a message from the messages array
  deleteMessage(message: Message) {
    
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === message.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete(this.url + message.id)
      .subscribe(
        (response: Response) => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  // fn to add a message into the messages array
  addMessage(newMessage: Message) {

    if (!newMessage) {
      return;
    }

    // make sure id of the new message is empty
    newMessage.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, data: Message }>(this.url,
      newMessage,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.data);
          this.sortAndSend();
        }
      );

  }

  updateMessage(originalmessage: Message, newMessage: Message) {

    if (!originalmessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === originalmessage.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new message to the id of the old message
    newMessage.id = originalmessage.id;

    // update database
    this.http.put(this.url + originalmessage.id,
      newMessage, { headers: this.headers })
      .subscribe(
        (response: Response) => {
          this.messages[pos] = newMessage;
          this.sortAndSend();
        }
      );

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
  storeMessages(){
    const newMessages = JSON.stringify(this.messages);
    this.http.put(
      this.url, 
      newMessages,
      {
        headers: new HttpHeaders({"Content-Type":"application/json"})
      }
    )
    .subscribe(
      () => this.messageListChangedEvent.next(this.messages.slice())
    )
  }

  
  // sort messages
  sortAndSend(){

    this.messages.sort((a, b) => {
      if(+a.id < +b.id){
        return -1;
      }else{
        return 1;
      }
    });

    this.messageListChangedEvent.next(this.messages.slice());
  }
  
  // this function adjusts the sender attribute of each message to have the sender's id and not their _id
  senderCorrection(fetchedmessages){

    // create a contact holder variable named newContact
    let newContact;

    // update the sender attribute of each message to be the id and not the _id 
    return fetchedmessages['messages'].map(msg =>{

      // fetch a copy of the contacts using contact service
      const contacts = this.contactService.getContacts();

      // assign sender contact to newCOntact
      newContact = contacts.find(contact => {
        //condition for item we're looking for
        return contact._id == msg.sender
      });

      // change sender value to equal the id and not the _id
      msg.sender = newContact['id']; 

      // return each modified message inside the messages array that will be caught in the next step
      return msg;

    });

  }

}


