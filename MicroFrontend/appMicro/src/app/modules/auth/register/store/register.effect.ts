import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of, lastValueFrom } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { SecureKeys } from '@commons/constants/keys.constants';
import {
  LOGIN,
  REGISTER,
  REGISTER_DEVICE_ERROR
} from '@commons/constants/navigate.constants';
import { getKeyFromEnum } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { LoginType } from '@modules/auth/login/constants/login.constants';
import * as loginActions from '@modules/auth/login/store/login.actions';
import {
  REGISTER_FLOW_COMPLETED,
  REGISTER_FLOW_ONESPAN
} from '@modules/auth/register/constants/register.constants';
import {
  ALERT_USER_NOT_EXISTS_ERROR,
  StepEnrollmentType
} from '@modules/auth/register/entities/register.interface';
import { mapRegisterError } from '@modules/auth/register/helpers/register.helper';
import { RegisterFacade } from '@modules/auth/register/register.facade';
import { RegisterService } from '../register.service';
import * as actions from './register.actions';
import { AlertService } from '@commons/services/alert.service';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import {
  LogMessageDetails,
  LogSeverity
} from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';

@Injectable()
export class RegisterEffect {
  private logManagerService = inject(LogManagerService);

  constructor(
    private actions$: Actions,
    private router: Router,
    private facade: RegisterFacade,
    private navCtrl: NavController,
    private service: RegisterService,
    private secureStorage: AdlSecureStorageService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  runRegisterEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.runRegisterAction),
      withLatestFrom(
        this.facade.isFeatureFlagEnabled(
          FeatureFlagsKey.UseBavvExecutorStepFunctionEnrollment
        ),
        this.facade.isFeatureFlagEnabled(FeatureFlagsKey.BiometricsEnrollment)
      ),
      switchMap(([action, isEnabledBavvExecutorSF, isBiometricsEnrollment]) => {
        const content = action.payload.content;

        const isOnespanFlow = !!content.deviceCode || !!content.signatureCode;
        return defer(async () => {
          if (!isOnespanFlow) {
            this.facade.enableLoading();
          }
          const data = await lastValueFrom(
            this.service.getRegisterDataByEnrollmentTypeAndExecutorSF(
              action.payload,
              isEnabledBavvExecutorSF,
              isBiometricsEnrollment
            )
          );

          this.trackRegisterResponse({
            severity: LogSeverity.INFO,
            fileName: 'register.effect.ts',
            functionName: 'runRegisterEffect$',
            customMessage: `[Register] ProcessId: ${data.processId} Step: ${data.step}`
          });

          if (
            REGISTER_FLOW_COMPLETED.includes(data.step as StepEnrollmentType)
          ) {
            await this.secureStorage.put(
              SecureKeys.isEnrolled,
              'isEnrolled',
              true
            );
            await this.secureStorage.put(SecureKeys.seed, data.processId, true);
            await this.secureStorage.put(SecureKeys.OTPReceived, 'false', true);
          }

          return actions.runRegisterSuccessAction({ data });
        }).pipe(
          tap(({ data }) => {
            if (data.step === StepEnrollmentType.USER_DOES_NOT_EXISTS) {
              this.alertService.create(ALERT_USER_NOT_EXISTS_ERROR);
              return;
            }
            if (data.step === StepEnrollmentType.REDIRECT_TO_LOGIN) {
              this.navCtrl.navigateBack(LOGIN);
              this.facade.dispatch([
                loginActions.setLoginTypeAction({
                  loginType: LoginType.Password
                })
              ]);
            } else {
              let url;
              if (
                REGISTER_FLOW_ONESPAN.includes(data.step as StepEnrollmentType)
              ) {
                url = `${REGISTER.toString()}/registering-device`;
              } else {
                const step: string = getKeyFromEnum(
                  StepEnrollmentType,
                  data.step
                )
                  .toLowerCase()
                  .replace(/_/g, '-');
                url = `${REGISTER.toString()}/${step}`;
              }

              if (this.router.url.includes(url)) {
                this.navCtrl
                  .navigateForward(`/`, {
                    animated: false,
                    skipLocationChange: true
                  })
                  .then(() =>
                    this.navCtrl.navigateForward(`${url}`, {
                      animated: false
                    })
                  );
              } else {
                this.navCtrl.navigateForward(`${url}`);
              }
            }
          }),
          catchError((error: HttpErrorResponse) => {
            if (isOnespanFlow) {
              this.navCtrl.navigateBack(REGISTER_DEVICE_ERROR);
              return of(
                actions.runRegisterErrorNotModalAction({
                  props: mapRegisterError.call(this, error)
                })
              );
            }
            this.navCtrl.navigateBack(LOGIN);
            return of(
              actions.runRegisterErrorAction({
                props: mapRegisterError.call(this, error)
              })
            );
          }),
          tap(() => this.facade.disableLoading())
        );
      })
    )
  );

  private trackRegisterResponse(logMessageDetails: LogMessageDetails) {
    this.logManagerService.log(logMessageDetails);
  }
}
