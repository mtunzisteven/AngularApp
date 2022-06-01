import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    // initialize sever with the obj of server that has id=1
    this.server = this.serversService.getServer(1);

    // The following code defines the value of server obj
    // The value is retrieved using route obj from the url, as set out in the 
    // app module definition of the /servers/:id appRoutes array
    // + converts string to number
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);

    // params below is an observable, a feature that is added by a third-party 
    // package which allows you to work with asynchronous tasks. It helps us
    // subscribe to an event which might happen in the future without blocking 
    // other code execution. Without this, using the routerLink array method in 
    // the template to change the url will work, but the id and name values will
    // not be updated in the user object. Useful only when the same path is reloaded
    // + converts string to number
    this.route.params
      .subscribe(
        (params: Params) => {

          this.server = this.serversService.getServer(+params['id']);

        }
      );
  }

}
