import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // emmit another event from a lister that caught the emitted event in the html
  @Output() recipeLinkEmitioncCaught = new EventEmitter<Recipe>();

  // an array that holds an array of recipes as defined in the recipe model
  @Input() recipes: Recipe[] = [
    new Recipe('myRecipe','My test recipe', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg' ), new Recipe('2nd Recipe', 'This one is a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // the event listener of the customer event created by clicking in the child component's html template
  recipeLinkEmitted(recipeEl: Recipe){
    this.recipeLinkEmitioncCaught.emit(recipeEl);
  }

}
