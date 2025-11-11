import { Injectable } from '@angular/core';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import {
  BiometricErrors,
  BiometricType
} from '@modules/auth/login/entities/biometric.interface';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class BiometricServiceMock {
  public biometricType$: BehaviorSubject<BiometricType> =
    new BehaviorSubject<BiometricType>(null);

  public hasBiometricRegistered$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public hasBiometricDenied$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public hasLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private secureStorage: AdlSecureStorageService) {}

  public async getBiometricType(): Promise<any> {
    return Promise.resolve();
  }

  public async setBiometricType(): Promise<void> {
    return Promise.resolve();
  }

  public async setHasBiometricRegistered(): Promise<void> {
    return Promise.resolve();
  }

  public async setHasBiometricDenied(): Promise<void> {
    return Promise.resolve();
  }

  public async cleanBiometricIfNecessary(): Promise<void> {
    return Promise.resolve();
  }

  public async cleanBiometrics(): Promise<void> {
    return Promise.resolve();
  }

  public async presentBiometric(): Promise<any> {
    return Promise.resolve();
  }

  public async useBiometric(): Promise<LoginUserPayload> {
    return Promise.resolve(null);
  }

  public async registerBiometric(loginData: LoginUserPayload): Promise<void> {
    return Promise.resolve();
  }

  public async configureBiometric(
    loginData: LoginUserPayload
  ): Promise<boolean> {
    return Promise.resolve(false);
  }

  public hasBiometricModalAllowed(): boolean {
    return false;
  }

  private biometricError(
    error: BiometricErrors,
    first: boolean = false
  ): Promise<void> {
    return Promise.resolve();
  }

  public async initBiometrics(): Promise<void> {
    return Promise.resolve();
  }

  public async denyBiometrics(): Promise<void> {
    return Promise.resolve();
  }

  public async deactivateBiometrics(): Promise<void> {
    return Promise.resolve();
  }

  get hasBiometric$(): Observable<boolean> {
    return of(false);
  }

  get biometricText$(): Observable<string> {
    return of('');
  }

  get biometricIconClass$(): Observable<string> {
    return of('');
  }
}
