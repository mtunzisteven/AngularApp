import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {

    // interval is an observable managed by rxjs package
    // non-Angular managed observables don't stop emitting values 
    // even when you've navigated away from the page. THis can 
    // eat up resources if not managed. We use Subscription type 
    // variable to store the subscription returned by the subscribing
    // observable so we can unsubscribe to it as we please.
    // this.firstObservableSubscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // );

    //--- Create a custom observable and add it to a variable called customIntervalObservable---||
    const customIntervalObservable = Observable.create(observer =>{

      let count = 0; // initialize the variable count with a value of zero

      // set an interval for every second: 1000
      setInterval(()=>{
        observer.next(count); // update the observer about the count value.

        // We can also use the observable's feature to complete emitting
        // Once the code below is executed, nothing more will be emitted
        // In HTTP requests, emitting ends when data has been streamed completely
        // just as it does here.
        if(count === 9){
          observer.complete();
        }

        // we also use observables to catch error, as they have built in error handling fns
        // as shown in the following error we created using logic.
        if(count > 3){
          observer.error(new Error('Count is now greater than 3!'));
        }
        count++; // Increase count by 1
      }, 1000)
    });     
    //-------------------------------------- Observable created --------------------------------||

    //-------------------------- Subscribe to Observable and use pipe to have access to operators: filter & map -------------------------------||
    this.firstObservableSubscription = customIntervalObservable
      .pipe(
        filter(data => { 

          // Here we return data only when the data value(count) is greater than 0
          return data > 0;

        }),
        map((data:number) => {

          // Here we return the data we received, but with the changes we wish to make
          return `Round: ${data}`;

        })
      )
      .subscribe(data => {
        // log data emitted by the custom observable subscribed to
        // The data will be a count every second.
          console.log(data);

      }, error=>{ // This second function of observable subscription allows us to do as we please with the error we receive from the  observable
        console.log(error); // We log the error to the console. It will not come through as an error in red, because we handled it.
        alert(error.message); // We show the error message in our alert here.
      }, ()=>{ // this third of the observable subscription has an arrow fn with no args. It is used when emitting completed successfully
        console.log('Completed Emitting Observable!')
      });

    //---------------------------- Subscribe ends here ---------------------------------||

  }

  // When the page is navigated away from, we unsubscribe to the subscription we made 
  // Observable cleared from subscription.
  ngOnDestroy(): void {
    
    this.firstObservableSubscription.unsubscribe();

  }

}
