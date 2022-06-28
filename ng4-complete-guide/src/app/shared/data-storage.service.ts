import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }


  storeRecipes(){
    
    const recipes = this.recipeService.getRecipes();

    // sending a put request to Firebase overrides the data in that url
    // Specify the folder by adding the recipe part near the end of the url
    // .json required at the end of the url. This is a Firebase requirement
    // The second arg of put is the data we're sending to the database
    // put request will not generate id's for each recipe. You have to create them yourself
    return this.http.put('https://recipes-1d434-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(
        response => {
          console.log(response);
        }
    );

  }

  fetchRecipes(){

    // Specify the folder by adding the recipe part near the end of the url
    // .json required at the end of the url. This is a Firebase requirement
    // The second arg in put is not used when getting the data from the database
    // put request will not generate id's for each recipe. You have to create them yourself
    return this.http
      .get<Recipe[]>('https://recipes-1d434-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
          map(recipes => {
            // Use normal JS map method to make sure ingredients array is always available
            return recipes.map(recipe =>{
              // return recipe, but if no ingredients were in the recipes, just add empty array
              return {
                ...recipe, 
                ingredients: recipe.ingredients ? recipe.ingredients: []
              }
            })
          }),
          tap(recipes => {
            this.recipeService.setRecipes(recipes);
          })
        );
  }
}
