import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

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
  // newServerContent = '';

  // Accessing an element ref passed directly from the DOM using the reference
  @ViewChild('serverContentInput', {static: false}) serverContentInput: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }

  // the function that emits the serverCreated event and the input data
  // it takes as an argument, an input element passed directly from the DOM using the reference
  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverNameInput.value,
      serverContent:this.serverContentInput.nativeElement.value // nativeElement gives us acces to the actual element obtained through ElementRef
    });
  }

  // the function that emits the blueprintCreated event and the input data
  // it takes as an argument, an input element passed directly from the DOM using the reference
  onAddBlueprint(serverNameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serverNameInput.value,
      serverContent:this.serverContentInput.nativeElement.value // nativeElement gives us acces to the actual element obtained through ElementRef
    });
  }

  /**
   * NOTE: 
   * • Never access and change dom using element.value obtained using any of the methods above
   * • Better use string interpolation to do that instead of using references.
   * 
   */

}
