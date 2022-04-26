/**
 * This file's content is exported into the 'src/main.ts' file and 
 * is used as an arg to the bootstrap function
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] // bootstrap array lists all the components angular should know it analyses the index.html. 
  // It holds the keyword pointing to the following files for bootstrap to analyse:
  // app.component.(css/html/spec.ts/ts) 
})
export class AppModule { }
