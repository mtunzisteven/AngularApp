import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreationStatus = 'No server was created!';

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
  onCreateServer(){
    this.serverCreationStatus = 'Server was created!';
  }

}
