import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {

    // The following code defines the value of server obj
    // The value is retrieved using route obj from the url, as set out in the 
    // app module definition of the /servers/:id appRoutes array
    // + converts string id to number --------------------||
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);

    // params below is an observable, a feature that is added by a third-party 
    // package which allows you to work with asynchronous tasks. It helps us
    // subscribe to an event which might happen in the future without blocking 
    // other code execution. Without this, using the routerLink array method in 
    // the template to change the url will work, but the id and name values will
    // not be updated in the user object. Useful only when the same path is reloaded
    // + converts string to number   -------------------------||
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {

    //       this.server = this.serversService.getServer(+params['id']);

    //     }
    //   );

    // This is the best way to access server from Server Service using a resolver
    // the key: 'server' is provided in the routing module, and it points to the object
    // tht holds the server object with id, name and status.
     this.route.data.subscribe(
       (data: Data) =>{
         this.server = data['server'];
       }
     );
  }

  onEditServer(){

    // This line of code navigates us to root/servers/id/edit
    // we navigate to "edit" relative to "servers". queryParamsHandling
    // value tells Angular how to handle entered query parameters
    // Preserve value ensures that we don't lose them after navigating to 
    // another page.
    this.router.navigate(['edit'], {relativeTo:this.route, queryParamsHandling: 'preserve'});

  }

}
