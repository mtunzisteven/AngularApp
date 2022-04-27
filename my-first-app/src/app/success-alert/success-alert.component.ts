import { Component } from '@angular/core';

// component decorator used
@Component({
    selector: 'app-success-alert',
    template:   `
                    <h4>This is a Success Alert!</h4>
                `,
    styles:[`
        h4{
            background-color: greenyellow;
            color:darkgreen;
            padding: 4px;
            border-radius: 2px;
            max-width: 50%;
            margin: 5px auto;
            text-align: center;
            border: solid 2px darkgreen;

        }
    `]
})

export class SuccessAlertComponent{

}