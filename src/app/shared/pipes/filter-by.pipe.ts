import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: false
})
export class FilterByPipe implements PipeTransform {

  transform<T>(value: Array<T>, prop: string, propValue: string[]): Array<T> {
    let newValue: Array<T> = [];
    if(propValue.length){
      propValue.every((pVal: any) => newValue = [...newValue, ...value.filter((item: any) => item[prop] === pVal)]);
      console.log(newValue);
      return newValue;
    }
    return value;
  }

}
