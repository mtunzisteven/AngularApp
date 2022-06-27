import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{

    // interface forces us to use this method:
    // req arg is a generic interceptor that will yield any type of data that might be retrieved by the request
    // the interceptor will run code before the request leaves the app and is forwarded to subscribe
    // next is an function that will forward the request to the next step
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //this http interceptor method will run for all requests unless we specify a url it should run in
        // if(req.url == 'url'){ code to execute}

        // Since the requsest is imutable, we have to create a new constant to hold a modified version
        // We fisrt clone the original req, modify it, and then return the modified version using the next.handle method
        const modifiedReq = req.clone({headers: req.headers.append('auth', 'xyz')}); // we simply added new headers here
        
        // next.handle(req) lets request leave the app | without this, the app will break
        // next.handle(modifiedReq) is an observable that has the response, 
        // using pipe on it can allow us to intercept the response and modify it as we please using: .pipe(map/ .pipe(tap etc
        return next.handle(modifiedReq); 
    } 

  constructor() { }
}
