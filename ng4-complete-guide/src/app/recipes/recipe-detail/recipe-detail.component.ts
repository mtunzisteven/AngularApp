import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe;
  id: number;

  constructor(
    private recipeService:RecipeService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );


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

  onEditRecipe(){

    // Already in recipe/id. so we navigate to /edit
    this.router.navigate(['edit'], {relativeTo:this.route})
  }
}
