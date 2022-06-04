import { Injectable } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    CanActivateChild, 
    Router, 
    RouterStateSnapshot, 
    UrlTree 
} from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from "./aurth.service";

@Injectable()
export class AuthGaurd implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService, private router: Router ){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
            return this.authService.isAuthenticated() 
                    .then(loggedIn =>{
                        if(loggedIn){
                            return true;
                        }else{
                            this.router.navigate(['/']);
                        }
                    } )

    }

    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            return this.canActivate(route, state);
        }

}