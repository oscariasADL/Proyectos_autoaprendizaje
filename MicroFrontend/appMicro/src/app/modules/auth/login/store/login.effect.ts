import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@commons/controllers/modal.controller';
import { NavController } from '@ionic/angular';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, from, Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, take, tap } from 'rxjs/operators';

import { InactiveChannelComponent } from '@commons/components/inactive-channel/inactive-channel.component';
import { SecureKeys } from '@commons/constants/keys.constants';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AnalyticsService } from '@commons/services/analytics.service';
import { AuthService } from '@commons/services/auth.service';
import { BiometricService } from '@commons/services/biometric.service';
import {
  LoginType,
  SEED_NOT_AVAILABLE
} from '@modules/auth/login/constants/login.constants';
import { mapLoginError } from '@modules/auth/login/helpers/login.helper';
import { LoginFacade } from '@modules/auth/login/login.facade';
import * as globalActions from '@store/actions/global.actions';
import * as loadingActions from '@store/actions/loading.action';
import { LoginUserResponse } from '../entities/login-user-response.interface';
import * as actions from './login.actions';
import { enabledDatadog } from '@commons/constants/events.constants';
import { datadogRum } from '@datadog/browser-rum';
import { LogSeverity } from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';
import { validateJwt } from '../helpers/login-validator.helpers';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { environment } from '@environment';
import { AppPlugin } from '@commons/native-plugins/AppPlugin';
import { getDBValue } from '@commons/helpers/text.helpers';
import { togglePushNotificationsAction } from '@store/actions/push-notification-register.actions';
import { TogglePushNotificationsType } from '@commons/entities/notifications/push-notification-register.entities';
import { NewRelicService } from '@app/commons/services/new-relic/new-relic.service';
import { PopupErrorLoginComponent } from '@app/commons/components/popup-error-login/popup-error-login.component';
import { POPUP_ERROR_LOGIN_INVALID_SEED } from '@app/commons/components/popup-error-login/constants/popup.constant';
import { FORGOT_PASSWORD } from '@app/commons/constants/navigate.constants';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: AuthService,
    private facade: LoginFacade,
    private modalCtrl: ModalController,
    private biometric: BiometricService,
    private analytics: AnalyticsService,
    private secureStorage: AdlSecureStorageService,
    private logManagerService: LogManagerService,
    private newRelicService: NewRelicService
  ) {}

  loginUserEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loginUserAction),
      switchMap((action) =>
        this.service.login(action.payload).pipe(
          switchMap((data: LoginUserResponse) =>
            defer(async () => {
              this.facade
                .isFeatureFlagEnabled(FeatureFlagsKey.EvaluateKeyToken)
                .subscribe((isEnabled) => {
                  if (isEnabled && environment.encrypt) {
                    from(
                      this.secureStorage.get(SecureKeys.publicKey)
                    ).subscribe(async (storedPublickey) => {
                      await validateJwt(data.token, storedPublickey, isEnabled);
                    });
                  }
                });

              await this.secureStorage.put(
                SecureKeys.token,
                data.token,
                !Capacitor.isNativePlatform()
              );
              await this.secureStorage.put(
                SecureKeys.userData,
                JSON.stringify(data),
                !Capacitor.isNativePlatform()
              );
              await this.secureStorage.put(
                SecureKeys.basicData,
                JSON.stringify(data.dataBasicClientDto),
                true
              );
              const logMessageDetails = {
                severity: LogSeverity.INFO,
                fileName: 'login.effects.ts',
                functionName: 'loginUserEffect$',
                customMessage: `Updated token, user data, and basic data on Session storage`
              };
              this.logManagerService.log(logMessageDetails);

              this.newRelicService.recordEvent(
                LogSeverity.INFO,
                'Login',
                data.dataBasicClientDto.documentNumber,
                {
                  fileName: 'login.page.ts',
                  functionName: 'login',
                  customMessage: `[UserID]=${document} Testing login function`
                }
              );
              if (this.biometric.hasBiometricModalAllowed()) {
                this.facade.disableLoading();
                await this.biometric.registerBiometric(action.payload);
                this.facade.enableLoading();
              } else if (this.biometric.hasBiometricRegistered()) {
                await this.biometric.updatePassword(action.payload);
              }
              this.facade.fetchFeatureToggle();
              return data;
            })
          ),
          mergeMap((data: LoginUserResponse) => [
            actions.setBasicDataAction({
              data: data?.dataBasicClientDto
            }),
            actions.loginUserSuccessAction({ data })
          ]),
          catchError((error: HttpErrorResponse) => {
            this.analytics.sendError('Login error', error);
            if (enabledDatadog) {
              datadogRum.addError(error, { url: error.url }, 'custom');
            }
            if (
              error.status === HttpStatusCode.BadRequest &&
              error.error.status === SEED_NOT_AVAILABLE
            ) {
              return of(actions.invalidSeedAction());
            } else {
              return of(
                actions.loginUserErrorAction({
                  props: mapLoginError(
                    error,
                    this.navCtrl,
                    this.facade.loginWithBiometric$.currentValue()
                  )
                })
              );
            }
          }),
          tap((response) => {
            if (response?.type !== actions.inactiveChannelAction.type) {
              this.facade.initUser(true);
            }
          })
        )
      )
    )
  );
  invalidSeedEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.invalidSeedAction),
        take(1),
        tap(async () => {
          this.facade.disableLoading();
          const modal = await this.modalCtrl.create({
            component: PopupErrorLoginComponent,
            mode: 'md',
            cssClass: 'avv-custom-modal',
            componentProps: {
              popUpData: POPUP_ERROR_LOGIN_INVALID_SEED,
              onClick: () => this.navCtrl.navigateForward(FORGOT_PASSWORD)
            }
          });
          await modal.present();
        })
      ),
    { dispatch: false }
  );
  loginUserSuccessEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loginUserSuccessAction),
        tap(async () => {
          const appInfo = await AppPlugin.getInfo();
          const db = await this.secureStorage.getAll();
          const appVersion: string =
            getDBValue(db, SecureKeys.appVersion) ?? null;
          const isNewVersion: boolean = appVersion != appInfo.version;

          if (appVersion && isNewVersion) {
            await this.secureStorage.put(
              SecureKeys.appVersion,
              appInfo.version,
              true
            );

            this.facade.dispatch([
              togglePushNotificationsAction({
                action: TogglePushNotificationsType.ENABLE,
                updateProvider: true
              })
            ]);
          }
        })
      ),
    { dispatch: false }
  );

  inactiveChannelEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.inactiveChannelAction),
        tap(async (action) => {
          this.facade.dispatch([
            loadingActions.disableLoadingAction(),
            globalActions.logoutUserAction({
              redirectToLogin: true,
              closeModal: false
            })
          ]);

          const modal = await this.modalCtrl.create({
            component: InactiveChannelComponent,
            cssClass: 'avv-custom-full-modal',
            mode: 'md'
          });
          await modal.present();

          return modal.onWillDismiss().then(() =>
            this.facade.dispatch([
              actions.setLoginTypeAction({
                loginType: LoginType.Password
              })
            ])
          );
        })
      ),
    { dispatch: false }
  );

  noProductsErrorEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.noProductsErrorAction),
        tap(async ({ message }) => {
          this.facade.dispatch([
            loadingActions.disableLoadingAction(),
            globalActions.logoutUserAction({
              redirectToLogin: false,
              closeModal: false
            })
          ]);
          void this.navCtrl.navigateRoot('/no-products-error');
        })
      ),
    { dispatch: false }
  );
}
