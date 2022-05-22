import { Injectable, EventEmitter } from "@angular/core";
import { LoggingService } from "./logging.service"; // service still needs to be imported even if used within another service

// @Injectable is the required decorator for all the services that get another service injected into them
// It is also becoming a requirement within services that inject into others, but as of now, it is meant for 
// services that get other services injected into them.
@Injectable() 

export class AccountsService{

    constructor(private loggingService: LoggingService){} // Injecting our logging service is done here

    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

    // Services give us the great ability to communicate accross components
    // with no limitations on parent or child, as with Input/Output decorators
    // Here we are creating an event emitter that can be emitted from any
    // component that uses the AcountServices instance in it.
    statusUpdateEvent = new EventEmitter<string>();

    addAccount(name: string, status: string){
        this.accounts.push({name: name, status:status});
        this.loggingService.logStatusChange(status); // Using a service within another service done here
    }

    updateAccount(id: number, status: string){
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status); // Using a service within another service done here

    }
}
