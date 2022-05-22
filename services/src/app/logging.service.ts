import { Injectable } from "@angular/core";

// Not currently needed for the injecting service, but required for the injected into service
// Angular appears to be adding the requirement in ongoing upgrades even on injector services
// For Angular 6+, there is no neeed to add the service in the app.module.ts file providers 
// simply use the following line when you add the Injectable decorator. This is optional: 
//////////////////////                         @Injectable({providedIn: 'root'})
@Injectable() 
export class LoggingService{

    logStatusChange(status:string){

        console.log('A server status changed, new status: ' + status);

    }
}