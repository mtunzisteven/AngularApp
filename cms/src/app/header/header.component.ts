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
  @Output() headerNav = new EventEmitter<string>();

  // emit event on event firing function
  onSelectedFeature(feature: any){
    console.log('feature select Clicked!');
    this.headerNav.emit(feature);
  }
  
}
