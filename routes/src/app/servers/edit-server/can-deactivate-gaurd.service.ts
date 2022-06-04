import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"

export interface CanComponentDeactivate{

    // class implementing this interface will be forced to have logic for this
    // following function which takes no args and returns a promis bool, observable bool or a bool
    canDeactivate:() => Observable<boolean> | Promise<boolean>| boolean

}

// the class below is the actual gaurd service that will be used in 
// the components we use it on. It implements CanDeactivate from @angular/router
// which is a generic type and will wrap our own custom interface to form
// the class or component that uses this service to implement this custom interface
export class CanDeactivateGaurd implements CanDeactivate<CanComponentDeactivate>{

    canDeactivate(
        component: CanComponentDeactivate, // this means the service implementing comp, which needs to implement the custom interface
        currentRoute: ActivatedRouteSnapshot, // 
        currentState: RouterStateSnapshot, // where you are
        nextState?: RouterStateSnapshot // where you are navigating to => optional
    ): boolean | Observable<boolean> | Promise<boolean>{

        // The following line is why we created the cutom interface
        // It allows the Angular router to execute canDeactivate in our service,
        // it also relies on the fact that the implementing component will
        // implement the interface in it. This is where we'll implement logic
        // about whether we should navigate away from route or not
        return component.canDeactivate();

    }
    
}