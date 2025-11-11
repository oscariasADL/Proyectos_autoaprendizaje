import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardDateFormat'
})
export class CreditCardDateFormatPipe implements PipeTransform {
  transform(text: string): string {
    return text.replace(/\W/gi, '').replace(/(.{2})/, '$1/');
  }
}
