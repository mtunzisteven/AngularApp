import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // in quotes is the name that was used as ref in html template
  @ViewChild('nameInput', {static: false}) name: ElementRef;

  // in quotes is the name that was used as ref in html template
  @ViewChild('amountInput', {static: false}) amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){

    // once items added, get their values using nativeElement
    // then create an object of Ingredient and add the values retrieved
    const ingredientName = this.name.nativeElement.value;
    const ingredientAmount = this.amount.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    // add the new ingredient object to the array of ingredient objects
    // in the ingredients array withing the shopping-list service
    this.shoppingListService.addIngredient(newIngredient);

  }

}
