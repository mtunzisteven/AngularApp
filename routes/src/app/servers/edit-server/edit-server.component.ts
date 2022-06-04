import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-gaurd.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {

  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {

    // Access query params and fragment only at initialization 
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);
    // console.log(this.route.snapshot.params['id']);

    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);

    // Access query params and fragment at all times(observables) 
    this.route.queryParams.subscribe(
      (queryParams: Params)=>{
        // Update the server as the respective server is selected
        this.allowEdit = queryParams['allowEdit'] === '1'? true: false;
      }
    );
    this.route.fragment.subscribe();
    this.route.params.subscribe(

      (params: Params)=>{
        // Update the server as the respective server is selected
        this.server = this.serversService.getServer(+params['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo: this.route}); // navigate one route up => here it will be in servers
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean>{
    if(!this.allowEdit){
      return true;
    }

    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      
      return confirm('Do you waant to discard the changes you\'ve made to the server?');

    }else{

      return true;

    }

  }

}
