import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  public servers: {id: number, name: string, status: string}[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router, // Angular router Object
    private route: ActivatedRoute // Angular router Object
    ) { }

  ngOnInit() {
    // Initialize servers array with servers obj in server service
    this.servers = this.serversService.getServers();
  }

  onAnotherGotoServers(){

    // router object helps us navigate to specified path in square brackets
    // route object heps us specify the route on which we are navigating from
    // when on path="root/servers", we need to be specific that we wish to go
    // to ['/servers'] when we wish to come to the same path. If we don't add
    // the forward slash, we cause an error. If navigating to same page, nothing
    // will happen, since we do not reload to navigating to path, Angular 
    // will know we are here already
    this.router.navigate(['/servers'], {relativeTo: this.route});

  }

}
