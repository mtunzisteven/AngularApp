import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styles:[
    `
        .white{
            color: white;
        }
    `
]
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = '';
  serverCreated = false;
  servers = ['testServer1', 'testServer2'];

  constructor() { 

    // change the value of the allowNewServer attriubute 2 sec after loading
    // this keyword inside arrow fn points to attribute
    setTimeout(()=>{
      this.allowNewServer = true;
    },2000)
  }

  ngOnInit(): void {
  }

  // when button is clicked(create server button), this must be fired
  // will use event button to call this function on button click
  onCreateServer(){

    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Server name is:'+ this.serverName;
  }

  // when input is entered(char by char), this must be fired
  // will use input event to call this function on input element
  // "<HTMLInputElement>event.target).value" is used in type script to
  // access the value of the input entered by the user in the input element
  onUpdateServerName(event:any){
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  /**
   *  Assignment: The basics -----------------------------------------------------------------
   */

  showDetails = false;
  toggleDetails = 'Show details';
  details = [];
  regNumber = 0;
  information = 'Now showing requested Details';

  onShowDetails(){

    this.regNumber = this.details.length+1;
    this.showDetails = !this.showDetails;
    this.toggleDetails = this.toggleDetails=='Hide details'? 'Show details': 'Hide details';
    // this.details.push(this.regNumber);
    this.details.push(new Date());

  }

  /**
   * Assignment End --------------------------------------------------------------------------
   */

}
