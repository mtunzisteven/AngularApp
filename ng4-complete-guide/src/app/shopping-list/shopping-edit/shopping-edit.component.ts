import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // Getting access to the form using ViewChild
  @ViewChild('f') shoppingListForm: NgForm;

  // Create a subscription variable to store a subscription that we'll be able to unsubscribe to
  subscription: Subscription;

  // variable to hold editing status
  editMode = false;

  // varibale to store index of item being edited
  editedItemIndex: number;

  // variable that will hold the edited item from ingredients
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

    // listen out for shopping list editing
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number)=>{
        this.editMode = true;
        this.editedItemIndex = index;

        this.editedItem = this.shoppingListService.getIngredient(index);

        // set the values of on the form to the values of the selected item
        this.shoppingListForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount,
        });

      }
    );

  }

  ngOnDestroy(): void {

    // Unsubscribe to the subscription to avoid memory leak
    this.subscription.unsubscribe();
  }

  onSubmitItem(shoppingListForm: NgForm){

    // once items added, get their values from the form template: shoppinglistForm
    // then create an object of Ingredient and add the values retrieved
    const ingredientName = shoppingListForm.value.name;
    const ingredientAmount = shoppingListForm.value.amount;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    if(this.editMode){

      // provide the ingredients array with the update ingredient object 
      // We access the ingredient in ingredients array within the shopping-list 
      // service using the index 
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);

      // return the edit mode status back to false
      this.editMode = false;

    }else{

      // add the new ingredient object to the array of ingredient objects
      // in the ingredients array withing the shopping-list service
      this.shoppingListService.addIngredient(newIngredient);
    }

    // this line will simply clear all values, states, and validity of the form set by the user and Angular
    shoppingListForm.reset();

  }

  // This one clears the form inputs and reverts edit mode to false
  onClear(){

    // clear the form
    this.shoppingListForm.reset();

    // ensure edit mode is reverted
    this.editMode = false;
  }

  // This one delete the selected item
  onDelete(){

    // Delete the ingredient in the shopping list service
    this.shoppingListService.deleteIngredient(this.editedItemIndex);

    // clear the form and revert edit mode
    this.onClear();

  }

}
