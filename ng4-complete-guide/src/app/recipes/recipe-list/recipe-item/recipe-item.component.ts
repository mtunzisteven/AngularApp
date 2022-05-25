import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // actual value received through @Input decorator in this component's html from the parent component's html 
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  // Here is the listener that will emit the emitter created above.
  onRecipeSelect(){

    // emit the recipe selected and the recipe is this recipe
    // which is the one selected in the html template
    // this is emitted in the click event method 
    this.recipeService.recipeSelected.emit(this.recipe);

  }

}
