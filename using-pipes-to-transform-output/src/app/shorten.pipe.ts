import { Pipe, PipeTransform } from "@angular/core";

// shortener is the name that 
// will be used to call this 
// custom pipe in the html template
@Pipe({
    name: 'shortener' 
}) // We must add this class to the declarations in the app.module file
export class ShortenPipe implements PipeTransform { 

    // Pipetransform interface forces us to use the transform function
    // The first argument is the value that we'll use the pipe on
    // The second arg is the parameter of the pipe which will be enter in the template
    transform(value: any, limit: number){
        if(value.length > limit){
            return value.substr(0, limit) + '...';
        }
        return value;
    }
}