import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  // ActivatedRoute gives us the currently accessed route
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    // The following code defines the value of id and name in the user obj
    // The values are retrieved using route obj from the url, as set out in the 
    // app module definition of the /users/:id/:name appRoutes array
    this.user = {
      id:this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    };

    // params below is an observable, a feature that is added by a third-party 
    // package which allows you to work with asynchronous tasks. It helps us
    // subscribe to an event which might happen in the future without blocking 
    // other code execution. Without this, using the routerLink array method in 
    // the template to change the url will work, but the id and name values will
    // not be updated in the user object.Useful only when the same path is reloaded
    this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];

        }
      );
  }

}
