import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  
  // a list of ingredients, as defined in the ingredients model
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 24), new Ingredient('Banana', 4)
  ];

  constructor() { } 
   
  ngOnInit(): void { 
  }

  ingredientOutputed(ingredientReceived: Ingredient){
    this.ingredients.push(ingredientReceived);
  }

}
