// Shorter TS way of defining a message class
export class Message{

    constructor(
        public id: number, 
        public subject: string, 
        public msgText: string, 
        public sender: string
    ){}
} 


/**

* id —the id of the message

* subject —the subject of the message

* msgText —the text of the message

* sender —the sender of the message

 */