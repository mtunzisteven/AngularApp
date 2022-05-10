import { 
  Component, 
  OnInit, 
  OnChanges,
  SimpleChanges,
  DoCheck,
  Input, 
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements 
      OnInit, 
      OnChanges, 
      DoCheck, 
      AfterContentChecked,  
      AfterContentInit,
      AfterViewInit,
      AfterViewChecked,
      OnDestroy {

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

  @Input() name:string;

  // accessing element by ref using @ViewChild and ElementRef
  // this reference is on the html template of this component
  @ViewChild('heading', {static: false}) header: ElementRef;

  // accessing element by ref using @ContentChild and ElementRef
  // this reference is on the html template of the parent component
  // static: true, because we'll use this element inside ngOnInit
  @ContentChild('paragraph', {static: true}) paragraph: ElementRef;

  constructor() { 
    console.log('Contructor called!');
  }

  // called whenever a new instasnce of this component is called(loaded)
  // or when changes occur(reloaded/changed value).
  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);

  }

  // called whenever Angular checks for changes
  ngDoCheck(): void{
    console.log('ngDoCheck called!');

  }

  // called whenever ng-content in the component is loaded or reloaded(after change detection cycle)
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }

  // called whenever ng-content in the component is loaded: only once
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');

  }

   // called whenever ng-content in the component is loaded or reloaded(after change detection cycle)
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }

  // called whenever ng-content in the component is loaded: only once
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log('Element TextContent After VI: '+ this.header.nativeElement.textContent); // using element content before view initialized
    console.log('Paragraph TextContent After ngOnInit: '+ this.paragraph.nativeElement.textContent); // using element content before view initialized

  }

  // called whenever ng-content in the component is loaded: only once
  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }

  // called whenever a new instasnce of this component is called(loaded)
  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log('Element TextContent Before VI: '+ this.header.nativeElement.textContent); // using element content before view initialized
    console.log('Paragraph TextContent Before ngOnInit: '+ this.paragraph.nativeElement.textContent); // using element content before view initialized

  }

}
