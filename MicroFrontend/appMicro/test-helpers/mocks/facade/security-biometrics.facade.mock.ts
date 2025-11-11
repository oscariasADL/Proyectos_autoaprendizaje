import { Injectable } from '@angular/core';
import {
  SecurityBiometricStep,
  VerifyPasswordPayload
} from '@modules/security/security-biometrics/entities/security-biometrics.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SecurityBiometricsFacadeMock extends AppFacadeMock {
  public working$: Observable<boolean> = new BehaviorSubject(false);

  public step$: Observable<SecurityBiometricStep> = new BehaviorSubject(null);

  public setSecurityBiometricStep(step: SecurityBiometricStep): void {}

  public verifyPassword(payload: VerifyPasswordPayload): void {}
  public sendCustomFactsRSA(): void {}
}
