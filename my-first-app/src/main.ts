/**
 * This is the file which holds the scripts that are inserrted into the finale html file served to browser
 * It is the first file that get executed when we serve our app
 */
import { enableProdMode } from '@angular/core'; // this checks if we're on production mode or not and turns off some warnings respectively
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'; // the file within our app
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/**
 * The following line bootstraps(starts) our app by adding the app module as an argument to the function bootstrap(start) 
 * When angular starts running, this line tells it to look inside app.module.ts file and in there it finds an array that gives 
 * it information about the components it should use(app.component[css/html/spec.ts/ts]). In the app.component.ts file, it learns 
 * the name of the html element it will inject the template into('selector'), as well as the files in which html template and its css
 * are found within that root level
 */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
