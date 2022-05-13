import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: "[appBasicHighlight]" // put the name of the attribute to be used in the html templates iside squre brackets. 
})

export class BasicHighlightDirective implements OnInit{

    // add private infront of element ref to ensure that it is accessible in this class.
    constructor(private elementRef: ElementRef){}

    ngOnInit(): void {

        // change the style of element where appBasicHighlight will be added
        this.elementRef.nativeElement.style.backgroundColor = "green";
    }

}