import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AVAL_STOCKS, PRODUCTS } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import { AvalFacade } from '@modules/aval/aval.facade';
import {
  CHANNEL,
  StockDetailResponse
} from '@modules/aval/entities/stocks.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stocks-detail',
  templateUrl: './stocks-detail.component.html',
  styleUrls: ['./stocks-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksDetailComponent implements OnInit {
  constructor(
    private facade: AvalFacade,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    const { date, type } = this.params;
    this.facade.fetchAvalStocksDetail({ date, type });
  }

  public getChannel(type: number): string {
    return CHANNEL[type];
  }

  public close(): void {
    this.navCtrl.navigateBack(PRODUCTS);
  }

  public backStocks(): void {
    this.navCtrl.navigateBack(AVAL_STOCKS);
  }

  get stocksDetail$(): Observable<StockDetailResponse> {
    return this.facade.stocksDetail$;
  }

  get working$(): Observable<boolean> {
    return this.facade.stocksDetailWorking$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.stocksDetailCompleted$;
  }

  get params(): { date: string; type: string } {
    return this.route.snapshot.params as any;
  }
}
