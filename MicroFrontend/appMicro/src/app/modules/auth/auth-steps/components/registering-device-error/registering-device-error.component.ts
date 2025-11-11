import { Component } from '@angular/core';
import { AlertService } from '@commons/services/alert.service';
import { HOME } from '@commons/constants/navigate.constants';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { NavController } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { VIRTUAL_BANKING_ALERT } from '../../constants/auth-steps.constants';

@Component({
  selector: 'app-registering-device-error',
  templateUrl: './registering-device-error.component.html',
  styleUrls: ['./registering-device-error.component.sass']
})
export class RegisteringDeviceErrorComponent {
  constructor(
    private navCtrl: NavController,
    private facade: AuthStepsFacade,
    private alertService: AlertService
  ) {}

  public goToHome(): void {
    this.navCtrl.navigateForward(HOME);
  }

  public goToVirtualBanking(): void {
    this.alertService.create(VIRTUAL_BANKING_ALERT).then((confirm) => {
      if (confirm) {
        this.goToHome();
        this.facade.redirectExternal(LinkKey.linkDigitalBank);
      }
    });
  }
}
