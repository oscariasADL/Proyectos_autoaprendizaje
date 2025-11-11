import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import { LOGOUT_ALERT } from '@commons/components/side-menu/constants/logout-alert.constants';
import {
  CDT_MICROFRONTEND,
  DETAIL_HOUSING_MICROFRONTEND,
  HOME,
  LOGIN,
  MOVEMENTS_DETAIL,
  PAYMENTS,
  POCKETS,
  POCKETS_DETAIL,
  POCKETS_MICROFRONTEND,
  PRODUCTS,
  SAFE,
  TRANSFERS,
  WITHDRAW
} from '@commons/constants/navigate.constants';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { exitApp } from '@commons/utils/util';
import { NavController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  constructor(
    private platform: Platform,
    private facade: AppFacade,
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {}

  public listenBackButton(): void {
    if (isNullOrUndefined(this.platform.backButton)) {
      return;
    }

    this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.first,
      () => this.handleBackButtonPress()
    );
  }

  private handleBackButtonPress(): void {
    const url = this.router.url;

    if (this.shouldShowLogoutAlert(url)) {
      this.showLogoutAlert();
    } else if (
      url.includes(MOVEMENTS_DETAIL.toString()) ||
      url.includes(POCKETS.toString()) ||
      url.includes(CDT_MICROFRONTEND.toString()) ||
      url.includes(POCKETS_MICROFRONTEND.toString()) ||
      url.includes(DETAIL_HOUSING_MICROFRONTEND.toString())
    ) {
      this.navCtrl.pop();
    } else if (
      url.includes(PRODUCTS.toString()) ||
      url.includes(PAYMENTS.toString()) ||
      url.includes(TRANSFERS.toString()) ||
      url.includes(WITHDRAW.toString()) ||
      url.includes(SAFE.toString())
    ) {
      this.navCtrl.navigateBack(HOME);
    } else if (url.includes(POCKETS_DETAIL.toString())) {
      this.navCtrl.navigateBack(POCKETS);
    }
  }

  private shouldShowLogoutAlert(url: string): boolean {
    return url === HOME.toString() || url.includes(LOGIN.toString());
  }

  private showLogoutAlert(): void {
    this.alertService.create(LOGOUT_ALERT).then((confirm) => {
      if (confirm) {
        exitApp();
      }
    });
  }
}
