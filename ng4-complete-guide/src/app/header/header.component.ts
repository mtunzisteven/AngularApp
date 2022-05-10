import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent {

  // The shopping list & recipes event emmiter
  @Output() headerNav = new EventEmitter<string>();

  // emit event on event firing function
  onSelectedFeature(feature){
    console.log('feature select Clicked!');
    this.headerNav.emit(feature);
  }
  
}
