/**
 * Created this component by hand, but could use the following on CLI to create components. It is easier, and you don't have to do anything else:
 * ng generate component [name] or ng g c [name]
 */
import { Component } from '@angular/core';

// component decorator used
@Component({
    selector: 'app-server',
    templateUrl: './server.component.html'
})

export class ServerComponent{

    // String enterpolation data binding examples: These value can now be access from the respective Html template when using {{value}}/{{fn call}}
    serverId: number = 10;
    serverStatus: string = 'offline';
    errorCode = 112;

    userName = '';

    getErrorCode(){
        return this.errorCode;
    }
}