/**
 * Angular uses components to build web pages, and uses modules to bundle different pieces(eg: components) 
 * of your app into packages. 
 * This file's content is exported into the 'src/main.ts' file and 
 * is used as an arg to the bootstrap function
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // We should import the component before declaring it
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component'; // We should import the component before declaring it
import { SuccessAlertComponent } from './success-alert/success-alert.component'; // We should import the component before declaring it
import { FormsModule } from '@angular/forms'; // Imported this forms module to enable the use of Two-Way-Binding



/**
 * ng decorator used
 * We tell the app which components to use in the declarations array 
 * We import more core Angular functionalities using imports arrays
 * */ 
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent
  ],
  imports: [ 
    BrowserModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent] // bootstrap array lists all the components angular should know before it analyses the index.html. 
  // It holds the keyword pointing to the following files for bootstrap to analyse:
  // app.component.(css/html/spec.ts/ts) 
})
export class AppModule { } // represents our entire app. In bigger projects, you may have more than one module.
