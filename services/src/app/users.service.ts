import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service"; // service still needs to be imported even if used within another service

@Injectable()
export class UsersService{

  activations: number = 0;
  deactivations: number = 0;


    constructor(private counterService: CounterService){}

    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];

    inactivate(id: number) {
      this.inactiveUsers.push(this.activeUsers[id]);
      this.activeUsers.splice(id, 1);
      this.counterService.onDeactivationAction();
    }

    activate(id: number) {
      this.activeUsers.push(this.inactiveUsers[id]);
      this.inactiveUsers.splice(id, 1);
      this.counterService.onActivationAction();
    }

}