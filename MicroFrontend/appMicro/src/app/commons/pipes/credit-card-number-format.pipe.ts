import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardNumberFormat'
})
export class CreditCardNumberFormatPipe implements PipeTransform {
  transform(text: string): string {
    return text.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
  }
}
