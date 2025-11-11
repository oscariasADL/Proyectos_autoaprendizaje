import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CREDITS } from '@commons/constants/navigate.constants';
import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';
import { NavController } from '@ionic/angular';
import { PaymentFetchFilter } from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { PaymentsFacade } from '@modules/payments/payment-home/payments.facade';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { PaymentsCreateButtonHelper } from './payments-create-items.helper';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsPage implements OnInit {
  public paymentList: AvvIconsBtnList[] = [];

  constructor(private navCtrl: NavController, private facade: PaymentsFacade) {}
  ngOnInit(): void {
    this.facade.closeToast();
    const isSPIEnabled = Boolean(
      this.facade.featureFlagsByKey(FeatureFlagsKey.SPIKeysMFE)
    );
    const transferButtonHelper = new PaymentsCreateButtonHelper();
    this.paymentList = transferButtonHelper.getButtonState(
      this.navCtrl,
      isSPIEnabled
    );
  }
  public navigateTo(item: AvvIconsBtnList): void {
    this.doActionBeforeRedirect(item);
    this.navCtrl.navigateForward(item.url);
  }

  private doActionBeforeRedirect(item: AvvIconsBtnList): void {
    if (item.url === CREDITS) {
      this.facade.setPaymentsFiltered(PaymentFetchFilter.OWN);
    }
  }
}
