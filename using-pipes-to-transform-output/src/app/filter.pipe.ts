import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0 || filterString === ''){
      return value;
    }

    const filteredResult = [];
    // in this case, value is an array and each array has a propName that will
    // be defined in the template using the pipe arg, as defined in the 2nd parameter above
    // filterString will also be set in the template, just as defined in the parameter list
    for(const item of value){
      if(item[propName] === filterString){
        filteredResult.push(item);
      }
    }
    return filteredResult;
  }

}
