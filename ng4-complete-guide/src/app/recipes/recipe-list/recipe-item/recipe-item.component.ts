import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // actual value received through @Input decorator in this component's html from the parent component's html 
  @Input() recipe: Recipe;

  // index of this component receiced from the recipe-list component
  @Input() index:number;
  constructor() { }

  ngOnInit(): void {
  }

}
