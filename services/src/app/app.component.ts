import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService]
})
export class AppComponent implements OnInit {

  // When we are dealing with the use attributes in component.ts file and component.html file
  // we create variables within the component and assign them the definition of the respective 
  // attribute we want to use. Then we'll have a copy/ reference of the service's attribute
  // the assignment process must be done in the ngOnInit function of the respective component

  // variable that will hold an array of accounts
  accounts: {name:string, status:string}[] = [];

  constructor(private accountsService: AccountsService){}

  ngOnInit(): void {

    // Accessing the attribute of accountsServices and then using its reference as 
    // the reference of the accounts array we defined above to give it access to the
    // instance's (accountService Object) account attribute features and value
    this.accounts = this.accountsService.accounts;
  }

}
