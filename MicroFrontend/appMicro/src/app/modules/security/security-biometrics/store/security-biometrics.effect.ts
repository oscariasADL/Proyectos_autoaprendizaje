import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { BiometricService } from '@commons/services/biometric.service';
import { SecurityBiometricStep } from '@modules/security/security-biometrics/entities/security-biometrics.interface';
import { mapVerifyPasswordError } from '@modules/security/security-biometrics/helpers/security-biometrics.helper';
import { SecurityBiometricsFacade } from '@modules/security/security-biometrics/security-biometrics.facade';
import { SecurityBiometricsService } from '@modules/security/security-biometrics/services/security-biometrics.service';
import * as actions from '@modules/security/security-biometrics/store/security-biometrics.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, firstValueFrom, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class SecurityBiometricsEffect {
  constructor(
    private actions$: Actions,
    private biometric: BiometricService,
    private facade: SecurityBiometricsFacade,
    private service: SecurityBiometricsService,
    private secureStorage: AdlSecureStorageService
  ) {}

  verifyPasswordEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.verifyPasswordAction),
      switchMap((action) =>
        this.service.verifyPassword(action.payload).pipe(
          switchMap(() =>
            defer(async () => {
              const db = await this.secureStorage.getAll();

              const { typeDocument, document } = JSON.parse(
                getDBValue(db, SecureKeys.loginData)
              );

              const { deviceName } = await firstValueFrom(
                this.facade.deviceInfo$
              );
              const fingerprint = getDBValue(db, SecureKeys.fingerprint);

              this.facade.disableLoading();

              const success = await this.biometric.configureBiometric({
                typeDocument,
                document,
                deviceName,
                deviceSerial: fingerprint,
                password: action.payload.password
              });

              this.facade.setSecurityBiometricStep(
                success
                  ? SecurityBiometricStep.finished
                  : SecurityBiometricStep.error
              );

              return actions.verifyPasswordSuccessAction();
            })
          ),
          catchError((response: HttpErrorResponse) =>
            of(
              actions.verifyPasswordErrorAction({
                props: mapVerifyPasswordError(response)
              })
            )
          )
        )
      )
    )
  );
}
