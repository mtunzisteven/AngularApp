import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService{

    // Recipe sected click event emitter to inform components of the event
    // recipeSelected = new EventEmitter<Recipe>(); 

    // Subject is a beter way to communicate accross components than EventEmitter
    recipeUpdated = new Subject<Recipe[]>();

    
    constructor(private shoppingListService: ShoppingListService){}

    // an array that holds an array of recipes as defined in the recipe model
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'myRecipe','My test recipe', 
    //         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg' ,
    //         [
    //             new Ingredient('tasty ingredient item', 5),
    //             new Ingredient('a second tasty ingredient item', 1),

    //         ]
    //         ), 
    //     new Recipe(
    //         '2nd Recipe', 'This one is a test', 
    //         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //         [
    //             new Ingredient('2nd tasty ingredient item', 5),
    //             new Ingredient('2nd a second tasty ingredient item', 1),

    //         ]
    //         )
    // ];

    // an array that holds an array of recipes as defined in the recipe model
    private recipes: Recipe[] = [];

    getRecipes(){
        // if we return only the recipe array, when changes are made
        // they will affect the array information in this service as well
        // we use .slice() to get a copy of the array, so that changes to
        // it do not affect the array in this service.
        return this.recipes.slice();
    }

    getRecipe(index: number){

        // not returning copy of object because it's all the same
        return this.recipes[index];

    }

    addRecipe(recipe: Recipe){

        // add the recipe to the recipes array
        this.recipes.push(recipe);

        // emit changed to the recipes array
        this.recipeUpdated.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){

        // replace the old recipe found with index with new recipe
        this.recipes[index] = newRecipe;

        // emit changed to the recipes array
        this.recipeUpdated.next(this.recipes.slice())

    }

    deleteRecipe(index: number){

        // delete the recipe found at the given index
        this.recipes.splice(index, 1);

        // emit changds to the recipes array
        this.recipeUpdated.next(this.recipes.slice())

    }


    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    setRecipes(recipes){

        // this overrides this.recipes with recipe
        this.recipes = recipes;

        // emit recipes changes throughout app with copy  of recipes
        this.recipeUpdated.next(this.recipes.slice())
    }
}