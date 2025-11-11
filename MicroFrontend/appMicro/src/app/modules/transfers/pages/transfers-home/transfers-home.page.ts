import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';
import { NavController } from '@ionic/angular';
import { TransfersButtonHelper } from './helpers/createTransfersItems.helper';
import { AppFacade } from '@app/app.facade';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { ADD_FAVORITE } from '@app/commons/constants/navigate.constants';

@Component({
  selector: 'app-transfers-home',
  templateUrl: './transfers-home.page.html',
  styleUrls: ['./transfers-home.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransfersHomePage implements OnInit {
  public BUTTON_LIST: AvvIconsBtnList[] = [];
  public readonly featureFlagsKey = FeatureFlagsKey;

  constructor(private navCtrl: NavController, private facade: AppFacade) {}

  ngOnInit(): void {
    this.facade.closeToast();
    const isSPIEnabled = Boolean(
      this.facade.featureFlagsByKey(FeatureFlagsKey.SPIKeysMFE)
    );
    const transferButtonHelper = new TransfersButtonHelper();
    this.BUTTON_LIST = transferButtonHelper.getButtonState(
      this.navCtrl,
      isSPIEnabled
    );
  }

  public goToCreateFavorite(): void {
    this.navCtrl.navigateForward(ADD_FAVORITE);
  }
}
