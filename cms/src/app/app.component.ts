import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  navSelected: string;

  switchView(selectedFeature: string){
    this.navSelected = selectedFeature;
  }
}
