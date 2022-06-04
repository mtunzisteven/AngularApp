import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "./servers.service";

// Created this interface to avoid typing the info inside it multiple times in our class below
interface Server{
    id:number, 
    name: string, 
    status: string
}

@Injectable()
export class ServerResolver implements Resolve<Server> {

    constructor(private serverService: ServersService){}

    // Method that must be implemented by classes that implememnt Resolve<T> interface
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
        
            // return the server using the method in server service
            // use route which is one of the resolve method args provided
            return this.serverService.getServer(+route.params['id']);
    }

}