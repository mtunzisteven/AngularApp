import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[RecipeService] // this service will be available to this component and all its children
})
export class RecipesComponent implements OnInit {

  recipeSelected: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {

    // We use this to inform the component which recipe was selected in recipe-item
    // We then assign the recipe tha was selected to this.recipeSelected
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.recipeSelected = recipe;
      }
    );

  }

}
