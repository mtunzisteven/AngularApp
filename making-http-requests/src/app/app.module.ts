import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule
  ],
  providers: [
    { // provide the AuthInterceptorService in a special way as follows | order important: auth first
      provide: HTTP_INTERCEPTORS, // token by which this injection can be identified by Angular to alert it this it is an http interceptor
      useClass:AuthInterceptorService, // The actual interceptor service we're injecting 
      multi: true // inform Angular not to replace other http interceptors with this one, but use them together
    },
    { // provide the LoggingInterceptorService in a special way as follows | order important: auth first
      provide: HTTP_INTERCEPTORS, // token by which this injection can be identified by Angular to alert it this it is an http interceptor
      useClass:LoggingInterceptorService, // The actual interceptor service we're injecting 
      multi: true // inform Angular not to replace other http interceptors with this one, but use them together
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
