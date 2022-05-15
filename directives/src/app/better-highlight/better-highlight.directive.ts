import { 
  Directive, 
  OnInit, 
  ElementRef, 
  Renderer2,
  HostListener,
  HostBinding,
  Input
 } from '@angular/core';

// this is the better way to inject style into the DOM: using rendere2
@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  // set the values of our properties provided in this directive from outside using @Input() directive
  @Input() defaultColor: string;
  @Input() hoveredOverColor: string;


  // Easier way to change properties of elements in DOM without using Rendere2
  // must specify the property and sub-property we are accessing(eg: style.backgroundColor)
  // as arg to @HostBinding. Camel case used instead of dashes.
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

    // carry this out in the Oninit method to ensure it is carried out at initialization
    this.backgroundColor = this.defaultColor;

    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');

  }

  // Angular core lister for events that takes the type of event as argument
  // No need to add anything more on the html template, the decorator reference
  // is used as the link between the event and the listener.  
  @HostListener('mouseenter') hoverOn(eventData: Event){

    // Acceptable option, but it is not the simplest to use.
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');

    // The simplest way to use does not require use of Renderer2
    this.backgroundColor = this.hoveredOverColor;

  }

  // Angular core lister for events that takes the type of event as argument
  // No need to add anything more on the html template, the decorator reference
  // is used as the link between the event and the listener.
  @HostListener('mouseleave') hoverOff(eventData: Event){

    // Acceptable option, but it is not the simplest to use.
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');

    // The simplest way to use does not require use of Renderer2
    this.backgroundColor = this.defaultColor;

  }
}
