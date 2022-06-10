import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[RecipeService] // this service will be available to this component and all its children
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
