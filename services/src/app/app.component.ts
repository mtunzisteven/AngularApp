import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';
import { CounterService } from './counter.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService]
})
export class AppComponent implements OnInit {

  activations: number = 0;
  deactivations: number = 0;
  deactivationsMessage: string;
  activationsMessage: string;
  assignment: boolean = false;

  activeUsers: string[] = [];
  inactiveUsers: string[] = [];

  // When we are dealing with the use attributes in component.ts file and component.html file
  // we create variables within the component and assign them the definition of the respective 
  // attribute we want to use. Then we'll have a copy/ reference of the service's attribute
  // the assignment process must be done in the ngOnInit function of the respective component

  // variable that will hold an array of accounts
  accounts: {name:string, status:string}[] = [];

  constructor(
    private accountsService: AccountsService, 
    private usersService: UsersService,
    private counterService: CounterService
    ){
      
      // Assignment------------------------------------------//
      

      this.counterService.activationCountEvent.subscribe(
        // event emitter will receive
        (activationMsg:string)=> {

          this.activations +=1;
          this.activationsMessage = `${activationMsg}${this.activations}`
        }
      );  

      this.counterService.deactivationCountEvent.subscribe(
        // event emitter will receive
        (deactivationMsg:string)=> {

          this.deactivations += 1;
          this.deactivationsMessage = `${deactivationMsg}${this.deactivations}`

        }
      );  
      
      //----------------------------------------------------End
    }

  ///////////////////////////////////////////////////////////
  //                       Assignment                      //
  ///////////////////////////////////////////////////////////

    onSetToInactive(id: number) {
      this.usersService.inactivate(id);
    }

    onSetToActive(id: number) {
      this.usersService.activate(id);
    }

  /////////////////////////////////////////////////////////// 
  //                    Assignment End                     //
  ///////////////////////////////////////////////////////////

  ngOnInit(): void {

    // Accessing the attribute of accountsServices and then using its reference as 
    // the reference of the accounts array we defined above to give it access to the
    // instance's (accountService Object) account attribute features and value
    this.accounts = this.accountsService.accounts;

    // Assignment----------------------------------------------------||
    this.activeUsers = this.usersService.activeUsers;
    this.inactiveUsers = this.usersService.inactiveUsers;
    //----------------------------------------------------------End--||
  }
}
