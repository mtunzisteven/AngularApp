import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // an array that holds an array of recipes as defined in the recipe model
  recipes: Recipe[] = [];

  // Subscription holding variable
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
     // initialize the recipes array in this component with the
     // copy of the array in services
    this.recipes = this.recipeService.getRecipes();

    this.subscription = this.recipeService.recipeUpdated
      .subscribe(
        (recipes: Recipe[]) => {
    
          this.recipes = recipes;     
          console.log(this.recipes);

        }
      );
    }

    ngOnDestroy(): void {

      this.subscription.unsubscribe();
    
    }

  onNewRecipe(){

    // already in /recipes route. We need to navigate from here to /new
    this.router.navigate(['new'], {relativeTo: this.route} )

  }

}
