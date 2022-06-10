import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  activatedSubscription: Subscription;
  userActivated = false;

  constructor(private userService: UserService){}

  ngOnInit(){

    // We store the subscription in a variable of type subscription 
    // This is so we can unsubscribe to the subscription inside 
    // OnDestroy using the same variable.
    this.activatedSubscription = this.userService.activatedEmitter.subscribe(

      (activationStatus: boolean) =>{
        this.userActivated = activationStatus;
      }
    );

  }

  ngOnDestroy(){

    // since Subject is an observable, we must unsubscribe to 
    // it when we navigate away from the page to preserve resources
    // We use the variable that stored the subscription to do it as follows:
    this.activatedSubscription.unsubscribe();

  }

  title = 'observables';
}
