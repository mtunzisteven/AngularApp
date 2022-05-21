import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

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


  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){

    console.log(this.name.nativeElement.value+' | '+this.amount.nativeElement.value);

    const ingredientName = this.name.nativeElement.value;
    const ingredientAmount = this.amount.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    this.ingredientAdded.emit(newIngredient);


  }

}
