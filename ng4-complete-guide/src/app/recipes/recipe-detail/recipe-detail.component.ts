import { Component, OnInit, Input, } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService:RecipeService){}


  @Input() recipe:Recipe;

  ngOnInit(): void {

  }

  onToShoppingList(recipe:Recipe){

    // for(let ingredient of recipe.ingredients){

    //   this.shoppingListService.addIngredient(ingredient);

    // } We'll use the recipe service to reach the shoppinglist service

    // passed the ingredients in the recipe to the recipe service 
    // where these will be accessed by the shopping list service
    // using @Injectable() 
    this.recipeService.addIngredientsToShoppingList(recipe.ingredients);
    
  }

}
