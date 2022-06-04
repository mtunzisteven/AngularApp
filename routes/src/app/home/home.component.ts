import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../aurth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private autService: AuthService
    ) { }

  ngOnInit() {
  }

  onGotoServers(id: number){

    // This line of code navigates us to root/servers/id/edit?allowEdit=1#Loading
    // Here we are adding the [routerLink] array, query params, & fragment programatically
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit:0}, fragment:'Loading'});
    
  }

  onLogin(){

    this.autService.logIn();

  }

  onLogout(){

    this.autService.logout();

  }
}
