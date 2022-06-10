import { Injectable,  } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class UserService{

  // Better way to emit events than EventEmitter is Subject
  // A perfect event emitter that is more recommended than the 
  // EventEmitter for their efficiency. Not suitable for use
  // if you plan to use @Output. That would require the 
  // good old EventEmitter
  activatedEmitter = new Subject<boolean>();

}