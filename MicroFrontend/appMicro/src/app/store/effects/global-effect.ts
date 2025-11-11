import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as globalActions from '../actions/global.actions';
import { AlertService } from '@commons/services/alert.service';
import { AppFacade } from '@app/app.facade';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import * as actions from '@modules/security/security-biometrics/store/security-biometrics.actions';
import { RsaBiometricsService } from '@app/modules/security/security-biometrics/services/rsa-biometrics.service';

@Injectable()
export class GlobalEffect {
  constructor(
    private actions$: Actions,
    private facade: AppFacade,
    private modalCtrl: ModalController,
    public alertService: AlertService,
    public router: Router,
    private rsaBiometricsService: RsaBiometricsService
  ) {}

  openExternalUrlEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(globalActions.openExternalUrl),
        tap((action) => {
          this.alertService.create(action.alertProps).then((confirm) => {
            if (!!confirm) {
              if (action.closeModalId) {
                void this.modalCtrl.dismiss(null, null, action.closeModalId);
              }
              if (action.ObservablePostCall) {
                action.ObservablePostCall.subscribe({
                  complete: () => {
                    this.facade.logout();
                    window.open(action.url, action.target);
                  }
                });
              } else {
                this.facade.logout();
                window.open(action.url, action.target);
              }
            }
          });
        })
      ),
    { dispatch: false }
  );

  openDeepLinkEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(globalActions.openDeepLink),
        tap((action) => {
          this.facade.disableLoading();
          void this.router.navigateByUrl(action.url);
        })
      ),
    { dispatch: false }
  );
  sendCustomFactsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.triggerBiometricRSAServiceAction),
      switchMap((action) =>
        this.rsaBiometricsService.callRSABiometrics().pipe(
          map((response) => actions.biometricRSAServiceSuccess()),
          catchError((error) => of(actions.biometricRSAServiceFailure()))
        )
      )
    )
  );
}
