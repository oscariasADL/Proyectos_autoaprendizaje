import { Injectable } from '@angular/core';
import { AppPlugin } from '@commons/native-plugins/AppPlugin';

import { SecureKeys } from '@commons/constants/keys.constants';
import { HOME, ONBOARDING } from '@commons/constants/navigate.constants';
import {
  getDBValue,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  constructor(
    private navCtrl: NavController,
    private secureStorage: AdlSecureStorageService
  ) {}

  public async checkOnboarding(): Promise<any> {
    const denyOnboarding = await this.denyOnboarding();
    const shouldSetAppVersion = await this.shouldSetAppVersion();
    if (shouldSetAppVersion) {
      await this.setAppVersion();
    }
    if (!denyOnboarding) {
      return this.navCtrl.navigateRoot(ONBOARDING);
    }
  }

  public async setOnboardingComplete(): Promise<any> {
    const denyOnboarding = await this.denyOnboarding();

    if (denyOnboarding) {
      return this.navCtrl.pop();
    } else {
      await this.secureStorage.put(
        SecureKeys.denyOnboarding,
        'denyOnboarding',
        true
      );

      return this.navCtrl.navigateRoot(HOME);
    }
  }

  private async denyOnboarding(): Promise<boolean> {
    const db = await this.secureStorage.getAll();

    return !isNullOrUndefinedOrEmpty(getDBValue(db, SecureKeys.denyOnboarding));
  }

  private async setAppVersion(): Promise<void> {
    const appInfo = await AppPlugin.getInfo();
    await this.secureStorage.put(SecureKeys.appVersion, appInfo.version, true);
  }

  private async shouldSetAppVersion(): Promise<boolean> {
    const db = await this.secureStorage.getAll();
    return isNullOrUndefinedOrEmpty(getDBValue(db, SecureKeys.appVersion));
  }
}
