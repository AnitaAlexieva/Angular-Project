import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText'
})
export class slicePipe implements PipeTransform {

  transform(value: string, maxCount = 5): string {
    return `${value.substring(0, maxCount)}${value.length > maxCount ? '...' : ''}`;
  }

}
