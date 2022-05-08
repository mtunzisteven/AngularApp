import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

  // the @Input() decorator allows the element named 'element' in this case to be accessible in the parent component
  // without it, the element is only available in the 'server-element' component. We use 'Input' instead of 'Output' 
  // because this element receives the data as opposed to sending it out.
  // When the string argument is used within @Input decorator, it becomes the alias that the element can now only be 
  // accessed by outside the component.
  @Input('srvElement') element:{
    type: string,
    name: string,
    content: string
  };

  constructor() { }

  ngOnInit(): void {
  }

}
