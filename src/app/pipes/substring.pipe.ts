import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring'
})
export class SubstringPipe implements PipeTransform {

  transform(value: string, size: number = -1): any {

    if (size === -1) {
      return value;
    }

    if (value.length > size) {
      return value.substring(0, size) + '...';
    }

    return value;
  }

}
