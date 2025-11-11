import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as navigate from '@commons/constants/navigate.constants';
import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';
import { NavController } from '@ionic/angular';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawPage {
  public withdrawList: AvvIconsBtnList[] = [
    {
      label: 'Giro a terceros',
      image: 'illustrationsV2/transferencia-terceros-regular.svg',
      id: 'btn-money-orders-service',
      className: 'item-credit',
      featureFlagKey: FeatureFlagsKey.Withdraw,
      action: () => this.navCtrl.navigateForward(navigate.MONEY_ORDER)
    },
    {
      label: 'Retiro sin tarjeta',
      image: 'illustrationsV2/retiro-dinero-small.svg',
      id: 'btn-cash-withdrawals-service',
      featureFlagKey: FeatureFlagsKey.CashWithdrawal,
      action: () => this.navCtrl.navigateForward(navigate.CASH_WITHDRAWAL)
    },
    {
      label: 'Recargas a celular',
      image: 'illustrationsV2/celular-dinero-regular.svg',
      featureFlagKey: FeatureFlagsKey.Recharges,
      id: 'btn-recharges-service',
      action: () => this.navCtrl.navigateForward(navigate.RECHARGES)
    }
  ];

  constructor(private navCtrl: NavController) {}
}
