import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { NavController, PopoverController } from '@ionic/angular';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { AppFacade } from '@app/app.facade';
import { LOGIN } from '@commons/constants/navigate.constants';
import { AuthService } from '@commons/services/auth.service';

import { SecureKeys } from '@commons/constants/keys.constants';
import {
  getDBValue,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty,
  randomString
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { AuthTimerService } from '@commons/services/auth-timer.service';
import { QuickActionsService } from '@commons/services/quick-actions.service';
import { base64Encrypt, encryptRSA } from '@commons/utils/encrypt';
import { LoginType } from '@modules/auth/login/constants/login.constants';
import * as loginActions from '@modules/auth/login/store/login.actions';
import * as actions from '@store/actions/config.action';
import * as configActions from '@store/actions/config.action';
import * as loadingActions from '@store/actions/loading.action';
import * as mailboxActions from '@store/actions/mailbox.action';
import * as pushNotificationRegister from '../actions/push-notification-register.actions';
import * as globalActions from '../actions/global.actions';
import * as interchangeActions from '../actions/interchange.action';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';
import { environment as ENV } from '@environment';
import { LogSeverity } from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';

@Injectable()
export class BootstrapEffects {
  private listeningPush: boolean = false;

  constructor(
    private actions$: Actions,
    private facade: AppFacade,
    private service: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private authTimer: AuthTimerService,
    private quickActions: QuickActionsService,
    private secureStorage: AdlSecureStorageService,
    private logManagerService: LogManagerService,
    private popoverCtrl: PopoverController // private interchangeKeyService: InterchangeKeyService
  ) {}

  logoutUserEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.logoutUserAction),
      tap(async (action) => {
        this.facade.dispatch([
          loginActions.setLoginTypeAction({ loginType: LoginType.Password })
        ]);
        await this.alertService.close();
        this.authTimer.stopWatching();
        await this.secureStorage.remove(SecureKeys.userData);
      }),
      switchMap((action) =>
        this.service.logout().pipe(
          map(() => globalActions.logoutUserSuccessAction()),
          catchError(() => of(globalActions.logoutUserErrorAction())),
          tap(async () => {
            if (!!action.redirectToLogin) {
              await this.navCtrl.navigateRoot(
                LOGIN.toString() + '?no-biometric=true'
              );
            }
          }),
          tap(async () => {
            await this.secureStorage.remove(SecureKeys.token);
            await this.secureStorage.remove(SecureKeys.isSpiConsentCalled);
          }),
          tap(() =>
            this.facade.dispatch([loadingActions.disableLoadingAction()])
          ),
          finalize(async () => {
            if (!isNullOrUndefined(await this.popoverCtrl.getTop())) {
              this.popoverCtrl.dismiss();
            }
            if (action.closeModal) {
              this.alertService.close();
              this.facade.closeModal();
            }
          })
        )
      )
    )
  );

  dispatchPingEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.dispatchPingAction),
      switchMap(() =>
        this.service.fetchPing().pipe(
          map(() => actions.dispatchPingSuccessAction()),
          catchError(() => of(actions.dispatchPingErrorAction()))
        )
      )
    )
  );

  initInterchangeKeyEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(interchangeActions.initInterchangeKeyAction),
      withLatestFrom(this.facade.interchangePublicKey$),
      tap(() => {
        const logMessageDetails = {
          severity: LogSeverity.INFO,
          fileName: 'bootstrap.effects.ts',
          functionName: 'initInterchangeKeyEffect$',
          customMessage: `Removed randomeKey and sessionHash`
        };
        this.logManagerService.log(logMessageDetails);
      }),
      tap(async () => {
        await this.secureStorage.remove(SecureKeys.randomKey);
        await this.secureStorage.remove(SecureKeys.sessionHash);
      }),
      switchMap(([_, publicKey]) =>
        (publicKey ? of(publicKey) : this.service.fetchInterchangeKey()).pipe(
          tap(async (publicKeyToStore) => {
            await this.secureStorage.put(
              SecureKeys.publicKey,
              publicKeyToStore,
              !Capacitor.isNativePlatform()
            );

            const logMessageDetails = {
              severity: LogSeverity.INFO,
              fileName: 'bootstrap.effects.ts',
              functionName: 'initInterchangeKeyEffect$',
              customMessage: `Updated publicKey value`
            };
            this.logManagerService.log(logMessageDetails);
          }),
          map((auxPublicKey) =>
            interchangeActions.initInterchangeKeySuccessAction({
              publicKey: auxPublicKey
            })
          ),
          catchError((error) => {
            const logMessageDetails = {
              severity: LogSeverity.ERROR,
              fileName: 'bootstrap.effects.ts',
              functionName: 'initInterchangeKeyEffect$',
              customMessage: `Failed init interchange ${error.message}`,
              error: error
            };
            this.logManagerService.log(logMessageDetails);
            void this.secureStorage.remove(SecureKeys.randomKey);
            void this.secureStorage.remove(SecureKeys.sessionHash);
            return of(interchangeActions.initInterchangeKeyErrorAction());
          })
        )
      )
    )
  );

  initInterchangeKeySuccessEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(interchangeActions.initInterchangeKeySuccessAction),
      switchMap(({ publicKey }) =>
        defer(async () => {
          const randomKey = randomString(32);
          const encryptKey = base64Encrypt(randomKey);
          const sessionId = encryptRSA(encryptKey, publicKey);

          const db = await this.secureStorage.getAll();
          const fingerPrint = getDBValue(db, SecureKeys.fingerprint);
          const sessionHash = await this.service
            .getInterchangeKey(sessionId, fingerPrint)
            .toPromise();
          await this.secureStorage.put(
            SecureKeys.randomKey,
            randomKey,
            !Capacitor.isNativePlatform()
          );

          const logMessageDetails = {
            severity: LogSeverity.INFO,
            fileName: 'bootstrap.effects.ts',
            functionName: 'initInterchangeKeySuccessEffect$',
            customMessage: `Updated [sessionHash]=${!!sessionHash} [sessionId]= ${!!sessionId} [fingerPrint]= ${!!fingerPrint} [randomeKey]= ${!!randomKey} [encryptKey]= ${!!encryptKey} [publicKey]= ${!!publicKey}`
          };
          this.logManagerService.log(logMessageDetails);
          return of(sessionHash);
        })
      ),
      switchMap((sessionHash$) =>
        sessionHash$.pipe(
          tap(
            async (sessionHash) =>
              await this.secureStorage.put(
                SecureKeys.sessionHash,
                sessionHash,
                !Capacitor.isNativePlatform()
              )
          ),
          mergeMap(() => [
            interchangeActions.callingAgainToInterchangeKeyAction(),
            interchangeActions.interchangeKeyDataSuccessAction()
          ]),
          catchError((error) => {
            void this.secureStorage.remove(SecureKeys.publicKey);
            void this.secureStorage.remove(SecureKeys.randomKey);
            void this.secureStorage.remove(SecureKeys.sessionHash);

            const logMessageDetails = {
              severity: LogSeverity.ERROR,
              fileName: 'bootstrap.effects.ts',
              functionName: 'initInterchangeKeySuccessEffect$',
              customMessage: `Removed publicKey, randomKey, sessionHash`,
              error
            };
            this.logManagerService.log(logMessageDetails);
            return of(interchangeActions.initInterchangeKeyErrorAction());
          })
        )
      )
    )
  );

  CallingAgainToInterchangeKeyEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(interchangeActions.callingAgainToInterchangeKeyAction),
      withLatestFrom(this.facade.interchangeKeyTimeoutId$),
      map(([_, timeoutIdStore]) => {
        if (timeoutIdStore) {
          clearTimeout(timeoutIdStore);
        }

        const timeoutId = window.setTimeout(() => {
          this.facade.initInterchangeKey();
        }, ENV.interchange_key.interval_in_minutes * 60 * 1000);

        return interchangeActions.setInterchangeKeyTimeoutIdAction({
          timeoutId,
          date: new Date()
        });
      })
    )
  );

  initUserEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.initUserAction),
      switchMap(({ redirectHome }) =>
        defer(async () => {
          const initActions = [];
          const db = await this.secureStorage.getAll();
          if (!isNullOrUndefinedOrEmpty(getDBValue(db, SecureKeys.seed))) {
            const basic = JSON.parse(getDBValue(db, SecureKeys.basicData));
            const pushNotificationsEnabled = getDBValue(
              db,
              SecureKeys.pushNotificationsEnabled
            );

            initActions.push(
              globalActions.setBasicDataAction({ basic }),
              pushNotificationRegister.setPushNotificationsStatusAction({
                status: pushNotificationsEnabled === 'true'
              })
            );
          }

          if (!isNullOrUndefined(getDBValue(db, SecureKeys.token))) {
            const data = JSON.parse(getDBValue(db, SecureKeys.userData));

            initActions.push(
              globalActions.setUserDataAction({ data }),
              configActions.fetchConfigAction(),
              globalActions.fetchComplementaryServicesAction({
                redirectHome
              }) /*,
              notificationsActions.fetchTransfiyaAuthorizationsAction(),
              notificationsActions.fetchNotificationsAction()*/
            );
          }

          // TODO Push notifications
          if (Capacitor.isNativePlatform() && !this.listeningPush) {
            this.listeningPush = true;
            initActions.push(mailboxActions.listenPushNotificationsAction());
          }

          return initActions;
        })
      ),
      mergeMap((initActions) => [...initActions])
    )
  );

  appLoadedEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(configActions.appLoadedAction),
        tap(() => {
          this.quickActions.init();
        })
      ),
    { dispatch: false }
  );
}
