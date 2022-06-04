import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './auth-gaurd.service';
import { ErrorPageComponent } from './error-page/error-page.component';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGaurd } from './servers/edit-server/can-deactivate-gaurd.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolver } from './servers/server-resolver.service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

// creating routes for the entire application
const appRoutes: Routes = [
  {path:'', component: HomeComponent}, // localhost:4200 will open HomeComponent
  {path:'users', component: UsersComponent, children:[
    {path:':id/:name', component: UserComponent} // localhost:4200/users/id will open UserComponent
  ]}, // localhost:4200/users will open UsersComponent
  {path:'servers', 
    // canActivate: [AuthGaurd], this adds auth to parent and children routes
    canActivateChild: [AuthGaurd],  // This only adds authentication to child routes
    component: ServersComponent, 
    children:[
      {path:':id', component: ServerComponent, resolve: {server: ServerResolver}}, // localhost:4200/servers/id will open ServersComponent
      {path:':id/edit', component: EditServerComponent, canDeactivate:[CanDeactivateGaurd]} // localhost:4200/servers/id/edit will open ServersComponent
  ]}, // localhost:4200/servers will open ServersComponent
  // {path:'not-found', component: PageNotFoundComponent}, // localhost:4200/not-found will open PageNotFoundComponent
  {path:'not-found', component: ErrorPageComponent, data:{message:'Page not found!!'}}, // localhost:4200/not-found will open ErrorPageComponent
  {path:'**', redirectTo: '/not-found'} // localhost:4200/any-undefined-path will open PageNotFoundComponent | must always be last route
];

@NgModule({
  imports: [ // the useHash key allows us to route properly even on live servers and old browsers without errors
             // RouterModule.forRoot(appRoutes, {useHash:true}) eg: domain.com/#/servers
    RouterModule.forRoot(appRoutes) // eg: domain.com/servers
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
