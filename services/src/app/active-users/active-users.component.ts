import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CounterService } from '../counter.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {

  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ){}

  @Input() users: string[];
  // @Output() userSetToInactive = new EventEmitter<number>();

  onSetToInactive(id: number) {
    this.usersService.inactivate(id);
    this.counterService.deactivationCountEvent.emit("Activations: ");
  }
}
