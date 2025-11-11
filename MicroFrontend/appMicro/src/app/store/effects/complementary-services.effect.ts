import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOME } from '@commons/constants/navigate.constants';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { ComplementaryServicesService } from '@commons/services/complementary-services.service';
import { NavController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as actions from '../actions/global.actions';
import { toggleSilenceComplementaryServicesAction } from '@modules/security/security-complementary-services/store/complementary-services.actions';
import { mapComplementaryServicesPayload } from '@modules/security/security-complementary-services/mappers/complementary-services.mapper';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AppFacade } from '@app/app.facade';
import { SecureKeys } from '@commons/constants/keys.constants';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import {
  getDBValue,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';

@Injectable()
export class ComplementaryServicesEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private secureStorage: AdlSecureStorageService,
    private service: ComplementaryServicesService,
    private facade: AppFacade
  ) {}

  complementaryServicesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchComplementaryServicesAction),
      switchMap((action) =>
        this.service.getComplementaryServices().pipe(
          switchMap((response: GenericResponse) => of(response)),
          withLatestFrom(
            from(this.facade.deviceInfo$),
            from(this.secureStorage.get(SecureKeys.loginData)),
            from(this.secureStorage.get(SecureKeys.fingerprint))
          ),
          switchMap(([response, deviceInfo, loginData, fingerprint]) => {
            const seedSowingFlag = this.facade.featureFlagsByKey(
              FeatureFlagsKey.SeedSowingAlt
            );
            if (response?.hasComplementaryServices && seedSowingFlag) {
              return [
                actions.setComplementaryServicesStateAction({
                  state: response.hasComplementaryServices,
                  error: false
                }),
                toggleSilenceComplementaryServicesAction({
                  payload: mapComplementaryServicesPayload({
                    deviceInfo,
                    loginData: JSON.parse(loginData) ?? null,
                    fingerprint,
                    automaticValidation: true,
                    turnOn: response.hasComplementaryServices
                  })
                })
              ];
            }
            return [
              actions.setComplementaryServicesStateAction({
                state: response.hasComplementaryServices,
                error: false
              })
            ];
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              actions.setComplementaryServicesStateAction({
                state: false,
                error: true
              })
            );
          }),
          tap(async () => {
            if (action.redirectHome) {
              const db = await this.secureStorage.getAll();
              const openFromAdamId = !isNullOrUndefinedOrEmpty(
                getDBValue(db, SecureKeys.openFromDeepLink)
              );
              if (openFromAdamId) {
                void this.navCtrl.navigateForward(`/wallets/activate-token`);
                return;
              }
              this.navCtrl.navigateRoot(HOME);
            }
          })
        )
      )
    )
  );
}
