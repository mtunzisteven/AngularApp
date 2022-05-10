import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // actual value received through @Input decorator in this component's html from the parent component's html 
  @Input() recipe: Recipe;

  // emitted in the event lister function and received in the parent component's html template
  @Output() recipeLinkClicked = new EventEmitter<void>(); 

  constructor() { }

  ngOnInit(): void {
  }

  // Here is the listener that will emit the emitter created above.
  onRecipeSelect(){
    console.log();

    this.recipeLinkClicked.emit();

  }

}
