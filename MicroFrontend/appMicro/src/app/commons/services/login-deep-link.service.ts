import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import {
  ALLOWED_URLS_FOR_DEEPLINK,
  INIT_LOGIN_DEEP_LINK_ALERT
} from '@commons/constants/wallets.constants';
import { URLOpenListenerEvent } from '@capacitor/app';
import { Platform } from '@commons/constants/global.constants';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import {
  getDBValue,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { SecureKeys } from '@commons/constants/keys.constants';
import { AlertService } from '@commons/services/alert.service';
import { AppFacade } from '@app/app.facade';

@Injectable({
  providedIn: 'root'
})
export class LoginDeepLinkService {
  private platforms = [Platform.IOS];

  constructor(
    private secureStorage: AdlSecureStorageService,
    private alertService: AlertService,
    private facade: AppFacade
  ) {}

  public async validateLoginWithDeepLink(
    event: URLOpenListenerEvent
  ): Promise<void> {
    const { platform } = await Device.getInfo();
    const isUrlValid = this.isUrlOfWalletAuthorized(event.url);
    if (this.platforms.includes(<Platform>platform) && isUrlValid) {
      this.setLoginDeepLink();
      this.initLoginDeepLink();
      this.facade.logout(true, false);
    }
  }

  public async isLoginDeepLink(): Promise<boolean> {
    const db = await this.secureStorage.getAll();
    const openFromAdamId = !isNullOrUndefinedOrEmpty(
      getDBValue(db, SecureKeys.openFromDeepLink)
    );

    return openFromAdamId ?? false;
  }

  private initLoginDeepLink(): void {
    void this.alertService.create(INIT_LOGIN_DEEP_LINK_ALERT);
  }

  private isUrlOfWalletAuthorized(url: string = ''): boolean {
    return ALLOWED_URLS_FOR_DEEPLINK.some((allowedUrl) =>
      url.includes(allowedUrl)
    );
  }

  private setLoginDeepLink(): void {
    void this.secureStorage.put(SecureKeys.openFromDeepLink, 'true', true);
  }
}
