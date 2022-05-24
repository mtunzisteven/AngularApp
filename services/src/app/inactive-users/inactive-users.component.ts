import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CounterService } from '../counter.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {

  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ){}
  
  @Input() users: string[];
  // @Output() userSetToActive = new EventEmitter<number>();

  onSetToActive(id: number) {
    this.usersService.activate(id);
    this.counterService.activationCountEvent.emit("Deactivations: ");
  }
}
