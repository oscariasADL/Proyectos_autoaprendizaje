import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productNumberMask'
})
export class ProductNumberMaskPipe implements PipeTransform {
  transform(
    value: string | number,
    minDigitsToDisplay: number = 4,
    obfuscatoryLength: number = 4,
    characterObfuscatory: string = '*'
  ): string {
    const valueString = value.toString().replace(/\.,_\$/g, '');

    if (!valueString || valueString.length < minDigitsToDisplay)
      return value.toString();

    const lastDigits = valueString.slice(-minDigitsToDisplay);
    const obfuscatoryPrefix = characterObfuscatory.repeat(obfuscatoryLength);

    return `${obfuscatoryPrefix} ${lastDigits}`;
  }
}
