import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
  standalone: false
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, maxLength: number): any {
    if(maxLength && value.length > maxLength) {
      return value.substring(0, maxLength).trim().concat('...');
    }
    return value;
  }

}
