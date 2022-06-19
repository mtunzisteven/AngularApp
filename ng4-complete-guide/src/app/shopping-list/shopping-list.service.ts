import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    // emitter of new ingredient information
    // ingredientsChanged = new EventEmitter<Ingredient[]>();

    // Subject is a special observable that is a better way
    // to emit events than EventEmitter
    ingredientsChanged = new Subject<Ingredient[]>();

    // Subject is a special observable that is a better way
    // to emit events than EventEmitter
    startedEditing = new Subject<number>();

    
    // a list of ingredients, as defined in the ingredients model
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 24), 
        new Ingredient('Banana', 4)
    ];

    getIngredients(){

        // making the ingredients array accessible, but using slice to
        // only a copy of it is available, so changes propagate to this.ingredients
        return this.ingredients.slice();

    }

    getIngredient(index: number){

        // return an item selected by the index
        return this.ingredients[index];

    }

    addIngredient(ingredient: Ingredient){
        // add the ingredients to the ingredients array
        // that is the only change we'll allow to this original array
        this.ingredients.push(ingredient);

        // reflect the changes to ingredients by emitting a copy of the ingredients array
        this.ingredientsChanged.next(this.ingredients.slice());

    }

    updateIngredient(index: number, ingredient: Ingredient){

        // replace the ingredient found using index with the one we've receieved
        this.ingredients[index] = ingredient;

        // reflect the changes to ingredients by emitting a copy of the ingredients array
        this.ingredientsChanged.next(this.ingredients.slice());

    }

    deleteIngredient(index: number){

        // delete the ingrient found using its index from the array of ingredients
        this.ingredients.splice(index, 1);

        // reflect the changes to ingredients by emitting a copy of the ingredients array
        this.ingredientsChanged.next(this.ingredients.slice());

    }

    addIngredients(ingredients:Ingredient[]){

        // add the ingredients to the ingredients array using the spread operator inside push method
        // this method of adding many ingredients happens in one go, so is obviously more efficient
        // than using for loop option
        this.ingredients.push(...ingredients);

        // Reflect the changes to ingredients by emitting a copy of the ingredients array
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}