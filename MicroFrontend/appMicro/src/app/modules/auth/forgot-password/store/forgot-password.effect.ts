import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, Observable, of, lastValueFrom } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { SecureKeys } from '@commons/constants/keys.constants';
import {
  LOGIN,
  REGISTERING_DEVICE_URL_FOR_FORGOT_PASSWORD
} from '@commons/constants/navigate.constants';
import { getKeyFromEnum } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import {
  FORGOT_PASSWORD_FLOW_COMPLETED,
  FORGOT_PASSWORD_FLOW_COMPLETED_BIOMETRICS,
  FORGOT_PASSWORD_FLOW_ENDS_BANK,
  FORGOT_PASSWORD_FLOW_ENDS_BANK_BIOMETRICS,
  FORGOT_PASSWORD_FLOW_ONESPAN
} from '@modules/auth/forgot-password/constants/forgot-password.constants';
import { ForgotPasswordFacade } from '@modules/auth/forgot-password/forgot-password.facade';
import { ForgotPasswordService } from '@modules/auth/forgot-password/forgot-password.service';
import { isStepInFlow } from '@modules/auth/forgot-password/helpers/forgot-password.helper';
import * as actions from './forgot-password.actions';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { ForgotPasswordStrategyFactory } from '../strategies/forgot-password-strategy.factory';
import { NavigateToStepService } from '../services/navigate-to-steps.service';
import { mapForgotPasswordError } from '../mappers/forgot-password-error.mapper';
import { AlertSheetProperties } from '@app/commons/entities/alert/alert-sheet.entities';
import {
  LogMessageDetails,
  LogSeverity
} from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';

@Injectable()
export class ForgotPasswordEffect {
  private logManagerService = inject(LogManagerService);

  constructor(
    private router: Router,
    private actions$: Actions,
    private navCtrl: NavController,
    private facade: ForgotPasswordFacade,
    private service: ForgotPasswordService,
    private secureStorage: AdlSecureStorageService,
    private navigateToStepService: NavigateToStepService
  ) {}

  runForgotPasswordEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.runForgotPasswordAction),
      withLatestFrom(
        this.facade.isFeatureFlagEnabled(
          FeatureFlagsKey.UseBavvExecutorStepFunctionFP
        ),
        this.facade.isFeatureFlagEnabled(
          FeatureFlagsKey.ForgotPasswordWithBiometrics
        )
      ),
      switchMap(([action, isEnabledBavvExecutorSF, isBiometrics]) =>
        defer(async () => {
          this.facade.enableLoading();

          const data = await lastValueFrom(
            this.service.getForgotPasswordData(action.payload, {
              isBiometrics,
              isEnabledBavvExecutorSF
            })
          );

          this.trackForgotPasswordResponse({
            severity: LogSeverity.INFO,
            fileName: 'forgot-password.effect.ts',
            functionName: 'runForgotPasswordEffect$',
            customMessage: `[Forgot password] ProcessId: ${data.processId} Step: ${data.step}`
          });

          const completedSteps = isBiometrics
            ? FORGOT_PASSWORD_FLOW_COMPLETED_BIOMETRICS
            : FORGOT_PASSWORD_FLOW_COMPLETED;

          if (isStepInFlow(data.step, completedSteps)) {
            await this.secureStorage.put(
              SecureKeys.isEnrolled,
              'isEnrolled',
              true
            );
            await this.secureStorage.put(SecureKeys.seed, data.processId, true);
            await this.secureStorage.put(SecureKeys.OTPReceived, 'false', true);
          }

          return actions.runForgotPasswordSuccessAction({ data });
        }).pipe(
          tap(async ({ data }) => {
            const strategy = ForgotPasswordStrategyFactory.create(isBiometrics);

            const stepEnum = strategy.getStepEnum();

            const oneSpanStep = isBiometrics
              ? FORGOT_PASSWORD_FLOW_ONESPAN
              : null;
            const isOneSpanStep =
              isBiometrics && isStepInFlow(data.step, oneSpanStep);
            if (isOneSpanStep) {
              await this.navigateToStepService.navigate(
                `${REGISTERING_DEVICE_URL_FOR_FORGOT_PASSWORD}`,
                this.router.url
              );
            } else {
              const step = getKeyFromEnum(stepEnum, data.step)
                .toLowerCase()
                .replace(/_/g, '-');

              await this.navigateToStepService.navigate(step, this.router.url);
            }
          }),
          catchError((error: HttpErrorResponse) => {
            this.navCtrl.navigateForward(LOGIN);

            const flowBanksSteps = isBiometrics
              ? FORGOT_PASSWORD_FLOW_ENDS_BANK_BIOMETRICS
              : FORGOT_PASSWORD_FLOW_ENDS_BANK;
            const isErrorStep = isStepInFlow(
              error?.error?.step,
              flowBanksSteps
            );

            const alertProps: AlertSheetProperties = mapForgotPasswordError(
              error,
              isErrorStep,
              this.facade.redirectExternal.bind(this.facade)
            );

            return of(
              actions.runForgotPasswordErrorAction({
                props: alertProps
              })
            );
          }),
          tap(() => this.facade.disableLoading())
        )
      )
    )
  );

  private trackForgotPasswordResponse(logMessageDetails: LogMessageDetails) {
    this.logManagerService.log(logMessageDetails);
  }
}
