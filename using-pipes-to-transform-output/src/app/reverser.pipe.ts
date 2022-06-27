import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverser'
})
export class ReverserPipe implements PipeTransform {

  transform(value: any): any {

    // take the value, turn it into an array(split(""))
    // the created array is reversed(reverse())
    // the reversed is turned back into a dtring(join(""))
    return value.split("").reverse().join("");
    
  }

}
