import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AppPlugin } from '@commons/native-plugins/AppPlugin';

import { NEW_APP_UPDATE } from '@commons/constants/navigate.constants';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { NavController } from '@ionic/angular';
import {
  ParameterType,
  ParameterTypeExtension
} from '@store/state/parameter.state';
import { SecureKeys } from '../constants/keys.constants';
import {
  NewUpdateParameter,
  UpdatePlatform
} from '../entities/new-update/new-update.interface';
import { getDBValue, isNullOrUndefined } from '../helpers/text.helpers';
import { ParameterService } from './parameter.service';

@Injectable({
  providedIn: 'root'
})
export class NewAppUpdateService {
  private currentVersion: NewUpdateParameter;

  constructor(
    private navCtrl: NavController,
    private parameterService: ParameterService,
    private secureStorage: AdlSecureStorageService
  ) {}

  public async skipOptionalUpdate(): Promise<any> {
    await this.secureStorage.put(
      SecureKeys.optionalVersionSkipped,
      this.currentVersion?.appVersion,
      true
    );
  }

  public async checkNewAppUpdate(): Promise<any> {
    const appInfo = await AppPlugin.getInfo();
    try {
      const { version: appVersion } = appInfo;
      const appVersions: NewUpdateParameter[] = await this.parameterService
        .fetchParameter(
          ParameterType.appVersions.dashCase(),
          ParameterTypeExtension[ParameterType.appVersions]
        )
        .toPromise();

      const mustUpdate: boolean = await this.checkMustUpdate(
        appVersion,
        appVersions
      );

      if (Capacitor.isNativePlatform() && mustUpdate) {
        await this.navCtrl.navigateRoot(NEW_APP_UPDATE);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  private async checkMustUpdate(
    version: string,
    appVersions: NewUpdateParameter[] = []
  ): Promise<boolean> {
    const _version = appVersions.find((item) => item.appVersion === version);
    const mustUpdate =
      _version &&
      this.isPlatformToUpdate(_version) &&
      (await this.shouldShow(_version));

    if (mustUpdate) {
      this.currentVersion = _version;
    }
    return mustUpdate;
  }

  private isPlatformToUpdate(version: NewUpdateParameter): boolean {
    const { platform } = version;
    return (
      platform.toUpperCase() === UpdatePlatform.BOTH ||
      Capacitor.getPlatform().toUpperCase() === platform.toUpperCase()
    );
  }

  private async shouldShow(version: NewUpdateParameter): Promise<boolean> {
    const db = await this.secureStorage.getAll();
    const optionalVersionSkipped = getDBValue(
      db,
      SecureKeys.optionalVersionSkipped
    );

    return (
      version.isMandatoryUpdate.toLowerCase() === 'true' ||
      isNullOrUndefined(optionalVersionSkipped) ||
      (!isNullOrUndefined(optionalVersionSkipped) &&
        optionalVersionSkipped !== version.appVersion)
    );
  }

  get isMandatoryUpdate(): boolean {
    return this.currentVersion?.isMandatoryUpdate.toLowerCase() === 'true';
  }
}
