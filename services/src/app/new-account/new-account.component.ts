import { Component } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService] this commented out service instantiation provider is not 
  // needed as it is provided in the app.modules.ts file of this app.
  
  // defining providers is how we tell Angular how to instantiate service class objects
  // do not add the service class in providers if you want it to be instatiated only in
  // a parent component so you can avoid ahving different objects. Since services are
  // heirachical, as explained in above sentences, adding providers to app.module.ts
  // makes the instance of the service available to the entire app, including to other services
  // with this, we do not need to add it to providers in any component or service for that matter
})
export class NewAccountComponent {
  
  // the way to inject a service is to create its instance within the constructor of the component that will use it
  // private is used instead of using new, and the type specification is what specifies the exact service we instantiate
  // we also add providers key value pair in the Component decorator to tell Angular how to intantiiate the service - ie:
                                                                                          // providers: [LoggingService]
  constructor(
    // private loggingService: LoggingService, This services intance was provided in the app.module.ts file and injected into accounts services
    private accountsService: AccountsService
    ){
            
      // Since we inject the AccountService instance into this component,
      // we can not use the event emitter that is defined within that service 
      // and the event we emit will be available in all components that we
      // injected the AccountService into: Here we subscribe to the emitter
      //// we subscribe because the emitter wraps an observable.
      this.accountsService.statusUpdateEvent.subscribe(
        // event emitter will receive a string(status), then throw an alert
        (status:string)=> alert('New status created: '+status)
      );

    }

  onCreateAccount(accountName: string, accountStatus: string) {

    // This is where we actually use our services
    // No place where we instantiate the class obj ourselves
    // that is taken care of by Angular, and that is the 
    // Best way to do it.

    // Using accountsServive from accounts.service.ts
    this.accountsService.addAccount(accountName, accountStatus);

    // Using loggingServive from logging.service.ts
    // this.loggingService.logStatusChange(accountStatus);
  }
}
