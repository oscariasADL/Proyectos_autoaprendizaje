import { Pipe, PipeTransform } from '@angular/core';
import { MONTHS } from '@commons/components/calendar/constants/calendar.constants';
import { STOCK_TYPES_PLURAL } from '@modules/aval/entities/stocks.interface';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'avalStocksDetailTitle'
})
export class AvalStocksDetailTitlePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(params: { date: string; type: string }): string {
    return `${this.translate.instant(
      'AVAL.STOCKS.FIELDS.QUERY'
    )} ${this.translate.instant(
      STOCK_TYPES_PLURAL[params.type]
    )} ${this.translate.instant(
      'MONTHS.' + MONTHS[+params.date.slice(5, 7) - 1]
    )} ${params.date.slice(0, 4)}`;
  }
}
