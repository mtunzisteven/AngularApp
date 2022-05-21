import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // The Contacts list & recipes event emmiter
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  // emit event on event firing function
  onSelected(selectedEvent: string){
    console.log(selectedEvent+' tab event Clicked!');
    this.selectedFeatureEvent.emit(selectedEvent);
  }
  
}
