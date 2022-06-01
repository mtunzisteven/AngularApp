import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { UsersComponent } from './users/users.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { UserComponent } from './users/user/user.component';
import { FormsModule } from '@angular/forms';

// creating routes for the entire application
const appRoutes: Routes = [
  {path:'', component: HomeComponent}, // localhost:4200 will open HomeComponent
  {path:'users', component: UsersComponent}, // localhost:4200/users will open UsersComponent
  {path:'users/:id/:name', component: UserComponent}, // localhost:4200/users/id will open UserComponent
  {path:'servers', component: ServersComponent}, // localhost:4200/servers will open ServersComponent
  {path:'servers/:id/edit', component: EditServerComponent}, // localhost:4200/servers/id/edit will open ServersComponent

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServersComponent,
    UsersComponent,
    EditServerComponent,
    ServerComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) // this module registers the routes to Angular so it knows them as defined
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
