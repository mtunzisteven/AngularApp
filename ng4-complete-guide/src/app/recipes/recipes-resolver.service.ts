import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    let recipes = this.recipeService.getRecipes();

    // only fetch recipes from db if there no recipes in the recipes
    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes(); // resolver will will subscribe for me, no need to subscribe
    }else{
      return recipes;
    }

  }

}
