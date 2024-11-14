import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: false
})
export class FilterByPipe implements PipeTransform {

  transform<T>(value: Array<T>, prop: string, propValue: string): Array<T> {
    if(propValue !== 'all'){
     return value.filter((item: any) => item[prop] === propValue);
    }
    return value;
  }

}
