import { EventEmitter } from "@angular/core";

export class CounterService{

    activationCount: number = 0;
    deactivationCount: number = 0;

    // emitters
    activationCountEvent = new EventEmitter<string>();
    deactivationCountEvent = new EventEmitter<string>();

    onActivationAction() {
        this.activationCount +=1;
    }

    onDeactivationAction() {
        this.deactivationCount +=1;
    }
}