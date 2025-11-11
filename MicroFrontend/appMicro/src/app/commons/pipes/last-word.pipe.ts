import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { CapitalizePipe } from './capitalize.pipe';

@Pipe({
  name: 'lastWord'
})
export class LastWordPipe implements PipeTransform {
  constructor(private capitalize: CapitalizePipe) {}

  transform(value: string): string {
    return !isNullOrUndefined(value)
      ? this.capitalize.transform(value.split(' ').splice(-1)[0])
      : value;
  }
}
