import { Pipe, PipeTransform } from '@angular/core';
import { format as dateFormat } from 'date-fns';

@Pipe({
  name: 'secondsFormat'
})
export class SecondsFormatPipe implements PipeTransform {
  transform(seconds: number, format: string = 'mm:ss'): string {
    return dateFormat(new Date(seconds * 1000), format);
  }
}
