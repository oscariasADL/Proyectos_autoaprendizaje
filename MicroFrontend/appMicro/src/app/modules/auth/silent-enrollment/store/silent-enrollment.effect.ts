import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

import { SecureKeys } from '@commons/constants/keys.constants';
import {
  LOGIN,
  SILENT_ENROLLMENT
} from '@commons/constants/navigate.constants';
import { KONY_APP } from '@commons/constants/one-span.constants';
import { getDBValue, getKeyFromEnum } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { NavController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, firstValueFrom, Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import * as loginActions from '../../login/store/login.actions';
import { StepSilentEnrollmentType } from '../entities/silent-enrollment.interface';
import { mapSilentEnrollmentError } from '../helpers/silent-enrollment.helper';
import { SilentEnrollmentFacade } from '../silent-enrollment.facade';
import { SilentEnrollmentService } from '../silent-enrollment.service';
import * as actions from './silent-enrollment.actions';
import { enabledDatadog } from '@commons/constants/events.constants';
import { datadogRum } from '@datadog/browser-rum';
import { AlertService } from '@commons/services/alert.service';
import { ALERT_USER_NOT_EXISTS_ERROR } from '@modules/auth/register/entities/register.interface';
import { TranslateService } from '@ngx-translate/core';
import { DeviceData } from '@app/commons/entities/device/device.interface';

@Injectable()
export class SilentEnrollmentEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private navCtrl: NavController,
    private facade: SilentEnrollmentFacade,
    private service: SilentEnrollmentService,
    private secureStorage: AdlSecureStorageService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  runSilentEnrollmentEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.runSilentEnrollmentAction),
      switchMap((action) =>
        defer(async () => {
          this.facade.enableLoading();

          const data = await this.service
            .runSilentEnrollment(action.payload)
            .toPromise();

          if (data.step === StepSilentEnrollmentType.COMPLETED) {
            await this.remoteDataFromSharedPreferences(data.processId);
          }

          return actions.runSilentEnrollmentSuccessAction({ data });
        }).pipe(
          tap(({ data }) => {
            if (data.step === StepSilentEnrollmentType.USER_DOES_NOT_EXISTS) {
              this.alertService.create(ALERT_USER_NOT_EXISTS_ERROR);
              return;
            }
            const step: string = getKeyFromEnum(
              StepSilentEnrollmentType,
              data.step
            )
              .toLowerCase()
              .replace(/_/g, '-');
            const url = `${SILENT_ENROLLMENT.toString()}/${step}`;
            if (this.router.url.includes(url)) {
              this.navCtrl
                .navigateForward(`/`, {
                  animated: false,
                  skipLocationChange: false
                })
                .then(() =>
                  this.navCtrl.navigateForward(`${url}`, {
                    animated: false
                  })
                );
            } else {
              this.navCtrl.navigateForward(`${url}`);
            }
          }),
          catchError((error: HttpErrorResponse) => {
            this.navCtrl.navigateForward(LOGIN);
            if (enabledDatadog) {
              datadogRum.addError(error, { url: error.url }, 'custom');
            }
            return of(
              actions.runSilentEnrollmentErrorAction({
                props: mapSilentEnrollmentError.call(this, error)
              })
            );
          }),
          tap(() => this.facade.disableLoading())
        )
      )
    )
  );

  silentEnrollmentCompletedEffect$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.silentEnrollmentCompletedAction),
        switchMap((action) =>
          defer(async () => {
            const db = await this.secureStorage.getAll();
            const { deviceName } = (await firstValueFrom(
              this.facade.deviceInfo$
            )) as DeviceData;
            const { typeDocument, document, password } = JSON.parse(
              getDBValue(db, SecureKeys.silentEnrollmentData)
            );
            const fingerprint = getDBValue(db, SecureKeys.fingerprint);
            this.facade.dispatch([
              loginActions.loginUserAction({
                payload: {
                  typeDocument,
                  document,
                  deviceSerial: fingerprint,
                  deviceName,
                  password
                }
              })
            ]);

            this.actions$
              .pipe(ofType(loginActions.loginUserSuccessAction), take(1))
              .subscribe(async () => {
                await this.secureStorage.remove(
                  SecureKeys.silentEnrollmentData
                );
              });

            this.actions$
              .pipe(ofType(loginActions.loginUserErrorAction), take(1))
              .subscribe(async () => {
                await this.navCtrl.navigateRoot(LOGIN);
              });
          })
        )
      ),
    { dispatch: false }
  );

  private async remoteDataFromSharedPreferences(
    processId: string
  ): Promise<boolean> {
    await this.secureStorage.put(SecureKeys.seed, processId, true);
    await this.secureStorage.put(SecureKeys.isMigrated, 'isMigrated', true);
    await Preferences.remove({
      key: KONY_APP.SecureDeviceFingerprint
    });
    await Preferences.remove({
      key: KONY_APP.complementaryServices
    });
    await Preferences.remove({
      key: KONY_APP.deviceId
    });
    return true;
  }
}
