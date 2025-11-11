import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(
    value: string | number,
    currency: 'COP' | 'USD' | 'EUR' | null = null
  ): string {
    const currencies = {
      COP: {
        name: 'Pesos',
        region: 'es-CO'
      },
      USD: {
        name: 'US Dollar',
        region: 'en-US'
      },
      EUR: {
        name: 'Euro',
        region: 'fr-FR'
      }
    };

    const current = currency ? currencies[currency] : currencies.COP;

    let number = '0';

    if (typeof value === 'number') {
      number = Intl.NumberFormat(current.region).format(value);
    }

    if (typeof value === 'string') {
      const tryToNumber = Intl.NumberFormat(current.region).format(+value);

      if (tryToNumber === 'NaN') {
        number = value
          .replace(/<[^<>]*?>/g, '')
          .replace('$', '')
          .replace(' ', '')
          .replace(/\./g, '')
          .replace(',', '.');
        number = Intl.NumberFormat(current.region).format(+number);
      } else {
        number = tryToNumber;
      }
    }

    if (number === 'NaN') return value + '';

    return number + (currency ? ' ' + current.name : '');
  }
}
