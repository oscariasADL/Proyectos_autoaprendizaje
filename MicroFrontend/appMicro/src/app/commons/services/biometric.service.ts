/* eslint-disable max-lines */
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  BIOMETRIC_ERROR_ALERT,
  REGISTER_BIOMETRIC_ALERT
} from '@commons/constants/biometric.constants';
import { SecureKeys } from '@commons/constants/keys.constants';
import {
  getDBValue,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { AnalyticsService } from '@commons/services/analytics.service';
import {
  BiometricErrors,
  BiometricIconClass,
  BiometricOptions,
  BiometricType
} from '@modules/auth/login/entities/biometric.interface';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { environment as ENV } from '@environment';
import { SecurityBiometricsFacade } from '@app/modules/security/security-biometrics/security-biometrics.facade';

@Injectable({
  providedIn: 'root'
})
export class BiometricService {
  public biometricType$: BehaviorSubject<BiometricType> =
    new BehaviorSubject<BiometricType>(null);

  public hasBiometricRegistered$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public hasBiometricDenied$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public hasLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private alert: AlertService,
    private translate: TranslateService,
    private analytics: AnalyticsService,
    private fingerprintAIO: FingerprintAIO,
    private secureStorage: AdlSecureStorageService,
    private facade: SecurityBiometricsFacade
  ) {
    this.initBiometrics();
  }

  public async getBiometricType(): Promise<any> {
    try {
      return await this.fingerprintAIO.isAvailable({
        requireStrongBiometrics: true
      });
    } catch (error) {
      return null;
    }
  }

  public async setBiometricType(): Promise<void> {
    const biometricType = await this.getBiometricType();
    if (biometricType === 'biometric' || biometricType === 'finger') {
      // TouchID => Android: biometric, IOS: finger
      this.biometricType$.next(BiometricType.Finger);
    } else if (biometricType === 'face') {
      // FaceID => IOS: face
      this.biometricType$.next(BiometricType.Face);
    } else {
      this.biometricType$.next(null);
    }
  }

  public async setHasBiometricRegistered(): Promise<void> {
    const db = await this.secureStorage.getAll();
    const hasBiometricRegistered = !isNullOrUndefinedOrEmpty(
      getDBValue(db, SecureKeys.biometric)
    );
    this.hasBiometricRegistered$.next(hasBiometricRegistered);
  }

  public async setHasBiometricDenied(): Promise<void> {
    const db = await this.secureStorage.getAll();
    const hasBiometricDenied = !isNullOrUndefinedOrEmpty(
      getDBValue(db, SecureKeys.hasBiometricDenied)
    );
    this.hasBiometricDenied$.next(hasBiometricDenied);
  }

  public async cleanBiometricIfNecessary(): Promise<void> {
    if (
      isNullOrUndefined(this.biometricType$.currentValue()) &&
      this.hasBiometricRegistered$.value
    ) {
      await this.cleanBiometrics();
    }
  }

  public async cleanBiometrics(): Promise<void> {
    await this.secureStorage.remove(SecureKeys.biometric);
    await this.setHasBiometricRegistered();
  }

  public async presentBiometric(): Promise<any> {
    try {
      const biometricType = this.biometricType$.value;
      return await this.fingerprintAIO
        .loadBiometricSecret(BiometricOptions[biometricType])
        .then(async (result: any) => {
          return await result;
        })
        .catch(async (error: any) => {
          if (
            error.code === BiometricErrors.BIOMETRIC_NO_SECRET_FOUND &&
            this.hasBiometricRegistered$.value
          ) {
            await this.cleanBiometrics();
            return Promise.resolve({ error: error.code });
          }
          if (
            error.code === BiometricErrors.BIOMETRIC_NO_SECRET_FOUND &&
            !this.hasBiometricRegistered$.value
          ) {
            if (Capacitor.getPlatform() === 'android') {
              return await this.registerSecret(biometricType);
            }
            await this.registerSecret(biometricType);
            return this.fingerprintAIO.loadBiometricSecret(
              BiometricOptions[biometricType]
            );
          }
          if (error.code === BiometricErrors.BIOMETRIC_UNKNOWN_ERROR) {
            return await this.registerSecret(biometricType);
          }
          return Promise.resolve({ error: error.code });
        });
    } catch (error) {
      this.analytics.sendError('Biometric Error', error);
      return { error: error.code };
    }
  }

  public async registerSecret(biometricType: string): Promise<void> {
    return await this.fingerprintAIO.registerBiometricSecret({
      ...BiometricOptions[biometricType],
      secret: ENV.biometric_secret
    });
  }

  public async useBiometric(): Promise<LoginUserPayload> {
    if (this.hasBiometricRegistered$.value) {
      const biometricResponse = await this.presentBiometric();
      if (biometricResponse.hasOwnProperty('error')) {
        await this.biometricError(biometricResponse.error);
      } else {
        const db = await this.secureStorage.getAll();
        const loginData = getDBValue(db, SecureKeys.loginData);
        return Promise.resolve(JSON.parse(loginData) as LoginUserPayload);
      }
    }
    return Promise.resolve(null);
  }

  public async registerBiometric(loginData: LoginUserPayload): Promise<void> {
    if (this.hasBiometricModalAllowed()) {
      let saveBiometric = null;
      await this.alert.create({
        ...REGISTER_BIOMETRIC_ALERT,
        description: this.translate.instant(
          'BIOMETRICS.MODAL.REGISTER_BIOMETRIC.DESCRIPTION',
          { type: this.biometricText$.currentValue() }
        ),
        buttonsAction: [
          () => (saveBiometric = true),
          () => (saveBiometric = false)
        ]
      });
      await this.onSaveBiometric(saveBiometric, loginData);
    }
    return Promise.resolve();
  }

  private async onSaveBiometric(
    saveBiometric: any,
    loginData: LoginUserPayload
  ): Promise<any> {
    if (!isNullOrUndefined(saveBiometric)) {
      if (saveBiometric) {
        const biometricResponse = await this.presentBiometric();
        if (biometricResponse.hasOwnProperty('error')) {
          await this.biometricError(biometricResponse.error, true);
        } else {
          await this.secureStorage.put(
            SecureKeys.loginData,
            JSON.stringify(loginData),
            true
          );
          await this.secureStorage.put(
            SecureKeys.biometric,
            this.biometricType$.currentValue(),
            true
          );
          await this.setHasBiometricRegistered();
          this.facade.sendCustomFactsRSA();
        }
      } else {
        await this.denyBiometrics();
      }
    }
  }

  public async configureBiometric(
    loginData: LoginUserPayload
  ): Promise<boolean> {
    let response = false;
    if (this.hasBiometric$.currentValue()) {
      const biometricResponse = await this.presentBiometric();
      if (!biometricResponse.hasOwnProperty('error')) {
        await this.secureStorage.put(
          SecureKeys.loginData,
          JSON.stringify(loginData),
          true
        );
        await this.secureStorage.put(
          SecureKeys.biometric,
          this.biometricType$.currentValue(),
          true
        );
        await this.setHasBiometricRegistered();
        response = true;
      }
    }
    return Promise.resolve(response);
  }

  public async updatePassword(loginData: LoginUserPayload): Promise<void> {
    await this.secureStorage.put(
      SecureKeys.loginData,
      JSON.stringify(loginData),
      true
    );
  }

  public hasBiometricModalAllowed(): boolean {
    return (
      this.hasBiometric$.currentValue() &&
      !this.hasBiometricRegistered$.value &&
      !this.hasBiometricDenied$.value
    );
  }

  public hasBiometricRegistered(): boolean {
    return (
      this.hasBiometric$.currentValue() && this.hasBiometricRegistered$.value
    );
  }

  private async biometricError(
    error: BiometricErrors,
    firstTime: boolean = false
  ): Promise<void> {
    const type = this.biometricText$.currentValue();
    let title: string = this.translate.instant(
      'BIOMETRICS.MODAL.BIOMETRIC_ERROR.TITLE',
      { type }
    );
    let buttons: string[] = ['BIOMETRICS.MODAL.BIOMETRIC_ERROR.CONTINUE'];
    let description: string;

    switch (error) {
      case BiometricErrors.BIOMETRIC_LOCKED_OUT:
        description = this.translate.instant(
          'BIOMETRICS.MODAL.BIOMETRIC_ERROR.BLOCKED_ERROR'
        );
        break;

      case BiometricErrors.BIOMETRIC_NO_SECRET_FOUND:
        description = this.translate.instant(
          'BIOMETRICS.MODAL.BIOMETRIC_ERROR.CHANGES'
        );
        buttons = ['BIOMETRICS.MODAL.BIOMETRIC_ERROR.ACCEPT'];
        title = 'BIOMETRICS.MODAL.BIOMETRIC_ERROR.TITLE_CHANGES';
        break;

      case BiometricErrors.BIOMETRIC_DISMISSED:
        return; // No action needed for dismissed error

      default:
        description = firstTime
          ? this.translate.instant(
              'BIOMETRICS.MODAL.BIOMETRIC_ERROR.REGISTER_ERROR',
              { type }
            )
          : this.translate.instant(
              'BIOMETRICS.MODAL.BIOMETRIC_ERROR.DESCRIPTION',
              { type }
            );
        break;
    }

    await this.alert.create({
      ...BIOMETRIC_ERROR_ALERT,
      title,
      buttons,
      description
    });
  }

  public async initBiometrics(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await this.setBiometricType();
    }
    await this.setHasBiometricRegistered();
    await this.setHasBiometricDenied();
    await this.cleanBiometricIfNecessary();
    this.hasLoaded$.next(true);
  }

  public async denyBiometrics(): Promise<void> {
    await this.secureStorage.put(
      SecureKeys.hasBiometricDenied,
      'hasBiometricDenied',
      true
    );

    await this.setHasBiometricDenied();
  }

  public async deactivateBiometrics(): Promise<void> {
    await this.cleanBiometrics();
    await this.denyBiometrics();
  }

  get hasBiometric$(): Observable<boolean> {
    return this.biometricType$.pipe(
      map((type: BiometricType) => !isNullOrUndefined(type))
    );
  }

  get biometricText$(): Observable<string> {
    return this.biometricType$.pipe(
      map((type: BiometricType) =>
        this.translate.instant(
          'BIOMETRICS.TYPE.' + (type === 'finger' ? 'TOUCH_ID' : 'FACE_ID')
        )
      )
    );
  }

  get biometricIconClass$(): Observable<string> {
    return this.biometricType$.pipe(
      map((type: BiometricType) => BiometricIconClass[type])
    );
  }
}
