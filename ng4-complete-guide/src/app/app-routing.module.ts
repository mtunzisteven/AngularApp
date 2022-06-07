import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


// creating routes for the entire application
const appRoutes: Routes = [
  {path:'', redirectTo: '/recipes', pathMatch: 'full'}, // localhost:4200 will open AppComponent
  {path:'recipes', component: RecipesComponent, children: [
    {path:'', component: RecipeStartComponent},
    {path:'new', component: RecipeEditComponent}, // must be above :id route because Angular will confuse new for :id otherwise
    {path:':id', component: RecipeDetailComponent},
    {path:':id/edit', component: RecipeEditComponent}

  ]}, // localhost:4200/recipes will open UsersComponent
  {path:'shopping-list', component: ShoppingListComponent} // localhost:4200/shopping-list will open ShoppingListComponent
  ];

@NgModule({
  imports: [ // the useHash key allows us to route properly even on live servers and old browsers without errors
             // RouterModule.forRoot(appRoutes, {useHash:true}) eg: domain.com/#/servers
    RouterModule.forRoot(appRoutes) // eg: domain.com/servers
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
