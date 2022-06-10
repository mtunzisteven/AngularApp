import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private ingredientsChangeSubscription: Subscription;
  
  // a list of ingredients, as defined in the ingredients model
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {} 
   
  ngOnInit(): void { 

    // access the copy of ingredients array inside the service
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientsChangeSubscription = this.shoppingListService.ingredientsChanged.subscribe(

      // this ingredients array will be emitted each time a new ingredient 
      // is added to the ingredients in the shopping-list service, thus
      // updating the the array in this component about the changes
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }

    );
  }

  ngOnDestroy(): void {

    // cleanup subscription to avoid memory leaks
    this.ingredientsChangeSubscription.unsubscribe();
    
  }

}
