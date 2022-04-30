import { Component } from '@angular/core';

/**
 * In the Component decorator -> 
 * You can select the app component by app-root html element, html attribute or class as follows:
 *  By app-root html element
 *    element in template: <app-root></app-root> 
 *    selector: 'app-root'
 * 
 *  By attribute
 *    element in template: <div app-server></div> 
 *    selector: '[app-server]'
 * 
 *  By class:
 *    element in template: <div class='app-server'></div> 
 *    selector: '.app-server'
 * 
 * Other css selectors don't work
 * 
 * You also can define the html and css inline within the decorator insteaed of poiniting to external files as we've done here:
 * template: `
 *            <app-server></app- server>
 *            <app-server></app-server>
 *          `,
 * styles:[`
 *        h3{
 *          color: pink;
 *        }
 *      `]
 * 
 * The back ticks allow you to write the html or css in multiple lines. This method for adding these inline is useful when your 
 * lines of code are short. Otherwise, better to point to a file for each.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // This tells us the html file that will serve as a template and who content will be injected into the selector
  // styleUrls: ['./app.component.css'] // This tells us the file holding the css for the html template
  styles:[`
          h3{
            color: green;
          }
        `]

})

export class AppComponent {
  
}
