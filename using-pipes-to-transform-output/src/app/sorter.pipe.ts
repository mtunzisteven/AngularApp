import { ReturnStatement } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

// After output has been sent out, piped data changes to data can't be update 
// pure: false updates piped data after output is sent: like in database requests 
// this post output updating is expensive on memory for the Angular App. Be wary
@Pipe({
  name: 'sorter',
  pure: false 
})
export class SorterPipe implements PipeTransform {

  transform(value: any, sortBy: string): any {

    console.log(value);

    // the JS sort function for arrays with objects
    const sortedVals = value.sort((a, b) => {

      if(a[sortBy] > b[sortBy]){
        return 1;
      }else{
        return -1;
      }
          
    });

    console.log(sortedVals);

    return sortedVals;

  }

}
