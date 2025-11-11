import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { CustomFacts } from '@app/modules/product-options/recharges/entities/recharges.interface';
import { movementsDetailWorkingSelector } from '@modules/movement/store/movement.selector';
import {
  SecurityBiometricStep,
  VerifyPasswordPayload
} from '@modules/security/security-biometrics/entities/security-biometrics.interface';
import {
  setSecurityBiometricStepAction,
  triggerBiometricRSAServiceAction,
  verifyPasswordAction
} from '@modules/security/security-biometrics/store/security-biometrics.actions';
import { securityBiometricsStepSelector } from '@modules/security/security-biometrics/store/security-biometrics.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityBiometricsFacade extends AppFacade {
  public working$: Observable<boolean> = this.store.pipe(
    select(movementsDetailWorkingSelector)
  );

  public step$: Observable<SecurityBiometricStep> = this.store.pipe(
    select(securityBiometricsStepSelector)
  );

  public setSecurityBiometricStep(step: SecurityBiometricStep): void {
    this.store.dispatch(setSecurityBiometricStepAction({ step }));
  }

  public verifyPassword(payload: VerifyPasswordPayload): void {
    this.store.dispatch(verifyPasswordAction({ payload }));
  }
  public sendCustomFactsRSA() {
    this.store.dispatch(triggerBiometricRSAServiceAction());
  }
}
