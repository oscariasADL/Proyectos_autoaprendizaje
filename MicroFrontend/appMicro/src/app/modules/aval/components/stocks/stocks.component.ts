import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MONTHS } from '@commons/components/calendar/constants/calendar.constants';
import { AVAL_STOCKS_DETAIL } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import { AvalFacade } from '@modules/aval/aval.facade';
import {
  AvalStocks,
  STOCK_TYPES_LIST,
  STOCKS_MONTHS_BEFORE,
  StockType
} from '@modules/aval/entities/stocks.interface';
import { TranslateService } from '@ngx-translate/core';
import { getMonth, getYear, parseISO, subMonths } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksComponent implements OnInit {
  public stockTypeActive: StockType;

  constructor(
    private facade: AvalFacade,
    private navCtrl: NavController,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.setStockType(this.stocks$.currentValue().stockType[0]);
  }

  public setStockType(type: StockType): void {
    this.stockTypeActive = type;
  }

  public setPeriod(period: string): void {
    this.navCtrl.navigateForward(
      `${AVAL_STOCKS_DETAIL.toString()}/${period}/${this.stockTypeActive}`
    );
  }

  get shouldChooseStockType$(): Observable<boolean> {
    return this.stocks$.pipe(
      map((stocks: AvalStocks) => stocks?.stockType?.length > 1)
    );
  }

  get stocks$(): Observable<AvalStocks> {
    return this.facade.stocks$;
  }

  get stockTypesList(): any {
    return STOCK_TYPES_LIST;
  }

  get periods(): { value: string; label: string }[] {
    const date = parseISO(this.facade.date$.currentValue());

    const periods = [subMonths(date, STOCKS_MONTHS_BEFORE), subMonths(date, 1)];

    return periods.map((period) => ({
      value: `${getYear(period)}-${(getMonth(period) + 1)
        .toString()
        .padStart(2, '0')}`,
      label: `${this.translate.instant(
        'MONTHS.' + MONTHS[getMonth(period)]
      )} ${getYear(period)}`
    }));
  }
}
