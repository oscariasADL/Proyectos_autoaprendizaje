import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FORGOT_PASSWORD } from '@app/commons/constants/navigate.constants';

@Injectable({
  providedIn: 'root'
})
export class NavigateToStepService {
  constructor(private navCtrl: NavController) {}

  public async navigate(step: string, currentUrl: string): Promise<void> {
    const url = `${FORGOT_PASSWORD.toString()}/${step}`;

    if (currentUrl.includes(url)) {
      await this.navCtrl.navigateRoot('/', {
        animated: false,
        skipLocationChange: false
      });
      await this.navCtrl.navigateForward(url, { animated: false });
    } else {
      await this.navCtrl.navigateForward(url);
    }
  }
}
