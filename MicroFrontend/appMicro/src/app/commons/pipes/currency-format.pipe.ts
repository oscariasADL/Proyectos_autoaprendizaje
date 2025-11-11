import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import {
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe extends CurrencyPipe implements PipeTransform {
  transform(value: number | string | null | undefined): null;
  transform(value: number | string): string {
    if (!isNullOrUndefined(value)) {
      const _value = value.toString().trim();

      if (isNullOrUndefinedOrEmpty(_value)) {
        return value?.toString();
      }

      const transformed = super
        .transform(_value)
        .replace(/[.,]/g, (n) => (n === '.' ? ',' : '.'));
      const _values = transformed.split(',');

      return (
        '<span aria-hidden="true">' +
        _values[0].append(1, ' ') +
        (+_values[1] > 0
          ? `,<span class="decimal-numbers-format">${_values[1]}</span>`
          : '') +
        '</span>'
      );
    } else {
      return value?.toString();
    }
  }
}
