import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByValue',
  standalone: false
})
export class OrderByPipe implements PipeTransform {
  transform<T>(value: Array<T>, sortBy: {field: keyof T, order: 'asc' | 'desc'}): Array<T> {
    let newValue = value;

    if (sortBy.order === 'asc'){
      newValue = value.sort((a: any, b: any) => {
        if(typeof a[sortBy.field] === 'string'){
          return a[sortBy.field].localeCompare(b[sortBy.field])
        } else{
          return a[sortBy.field] - b[sortBy.field]
        }
      });
    } else if(sortBy.order === 'desc'){
      newValue = value.sort((a: any, b: any) => {
        if(typeof a[sortBy.field] === 'string'){
          return b[sortBy.field].localeCompare(a[sortBy.field])
        } else{
          return b[sortBy.field] - a[sortBy.field]
        }
      });
    }
    return newValue;
  }

}
