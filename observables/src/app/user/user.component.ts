import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
    
      (params: Params) => {
      this.id = +params.id;
    });

  }

  onActivate(){

    // where we use emit in the event emitter, we use "next" in a Subject
    // A subject is a special kind of an observable that does not require 
    // that you wrap the callback or event: next can be called on it from 
    // In observable we call next from outside it as opposed to othe observables
    this.userService.activatedEmitter.next(true);
  }
}
