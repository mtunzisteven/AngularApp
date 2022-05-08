import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  // with EventEmitter, we create our own events emiter obj that can be used to capture and emit the data defined in the obj
  // The @Output decorator makes the event and data accessible from outside the component. We use 'Output' instead of 'Input'
  // because we are sending data out of the component, as opposed to accessing data from outside the component
  @Output() serverCreated = new EventEmitter<{serverName:string, serverContent:string}>();
  // On this event we use an alias: 'bpCreated'. This is the name we'll access the event with outside this component
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName:string, serverContent:string}>();

  // newServerName = '';
  newServerContent = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  // the function that emits the serverCreated event and the input data
  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverNameInput.value,
      serverContent:this.newServerContent
    });
  }

  // the function that emits the blueprintCreated event and the input data
  onAddBlueprint(serverNameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serverNameInput.value,
      serverContent:this.newServerContent
    });
  }

}
