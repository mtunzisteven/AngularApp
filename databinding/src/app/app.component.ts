import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom // ShadowDom:default, Emulated: default CSS encapsulation, 
})
export class AppComponent {
  serverElements = [{type:'server', name:'Testserver', content:'Just a test!'}];

  // serverData is expected from input elements in the child component: server-element
  onServerAdded(serverData:{serverName:string, serverContent:string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  // blueprintData is expected from input elements in the child component: server-element
  onBlueprintAdded(blueprintData:{serverName:string, serverContent:string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  // For testing out life cycle hooks -------------------------------------------- |
  onChangeFirst(){ 
    console.log('Changed - Hit!');
    this.serverElements[0].name = "Changed!";
  }

  onDestroyFirst(){ 
    this.serverElements.splice(0, 1);
  }

  // ----------------------------------------------------------------------------- |
}
