import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CREDITS_PAY } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import {
  PaymentCredit,
  PaymentCredits,
  PaymentFetchFilter
} from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { PaymentCreditsFacade } from '@modules/payments/payment-credits/payment-credits.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-credits',
  templateUrl: './payment-credits.page.html',
  styleUrls: ['./payment-credits.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentCreditsPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private facade: PaymentCreditsFacade
  ) {}

  ngOnInit(): void {
    this.activateTab();
  }

  public activateTab(
    filter: PaymentFetchFilter = this.filterSelected$.currentValue()
  ): void {
    this.facade.fetchPaymentsFiltered(filter);
  }

  public payCard(card: PaymentCredit): void {
    this.facade.setCreditSelected(card);
    this.navCtrl.navigateForward(CREDITS_PAY);
  }

  get payments$(): Observable<PaymentCredits> {
    return this.facade.payments$;
  }

  get paymentsWorking$(): Observable<boolean> {
    return this.facade.paymentsWorking$;
  }

  get paymentsCompleted$(): Observable<boolean> {
    return this.facade.paymentsCompleted$;
  }

  get filterSelected$(): Observable<PaymentFetchFilter> {
    return this.facade.filterSelected$;
  }

  get paymentFetchFilter(): typeof PaymentFetchFilter {
    return PaymentFetchFilter;
  }
}
