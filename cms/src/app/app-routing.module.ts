import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { ContactsComponent } from "./contacts/contact.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentsComponent } from "./documents/documents.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";


// creating routes for the entire application
const appRoutes: Routes = [
    {path:'', redirectTo: '/documents', pathMatch: 'full'}, // localhost:4200 will redirect to DocumentsComponent
    {path:'documents', component: DocumentsComponent, children: [
      {path:'new', component: DocumentEditComponent}, // must be above :id route because Angular will confuse new for :id otherwise
      {path:':id', component: DocumentDetailComponent},
      {path:':id/edit', component: DocumentEditComponent}
    ]}, // localhost:4200/documents will open DocumentsComponent

    {path:'messages', component: MessageListComponent}, // localhost:4200/messages will open MessageListComponent
    {path:'contacts', component: ContactsComponent, children: [
        {path:'new', component: ContactEditComponent}, // must be above :id route because Angular will confuse new for :id otherwise
        {path:':id', component: ContactDetailComponent},
        {path:':id/edit', component: ContactEditComponent}
    ]} // localhost:4200/messages will open MessageListComponent

];
  
  @NgModule({
    imports: [ // the useHash key allows us to route properly even on live servers and old browsers without errors
               // RouterModule.forRoot(appRoutes, {useHash:true}) eg: domain.com/#/servers
      RouterModule.forRoot(appRoutes) // eg: domain.com/servers
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }