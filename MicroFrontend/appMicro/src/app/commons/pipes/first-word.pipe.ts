import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { CapitalizePipe } from './capitalize.pipe';

@Pipe({
  name: 'firstWord'
})
export class FirstWordPipe implements PipeTransform {
  constructor(private capitalize: CapitalizePipe) {}

  transform(value: string): string {
    return !isNullOrUndefined(value)
      ? this.capitalize.transform(value.split(' ')[0])
      : value;
  }
}
