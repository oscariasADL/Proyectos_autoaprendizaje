import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

// First letter of words
@Pipe({
  name: 'firstLettersWords'
})
export class FirstLettersWordsPipe implements PipeTransform {
  transform(value: string, numberWords: number = 2): string {
    if (!isNullOrUndefined(value)) {
      return value
        .split(' ')
        .slice(0, numberWords)
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase();
    }
    return value;
  }
}
