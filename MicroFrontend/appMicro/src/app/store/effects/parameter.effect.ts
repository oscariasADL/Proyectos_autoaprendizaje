import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppPlugin } from '@commons/native-plugins/AppPlugin';

import { SecureKeys } from '@commons/constants/keys.constants';
import {
  getDBValue,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { ParameterService } from '@commons/services/parameter.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  FeatureFlagsBm,
  ParameterList,
  ParameterType,
  ParameterTypeExtension
} from '@store/state/parameter.state';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../actions/parameter.action';
import { ONBOARDING } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import { AppFacade } from '@app/app.facade';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { ConfigCatFeatureToggleService } from '@app/commons/services/feature-toggle-configcat.service';

@Injectable()
export class ParameterEffect {
  private configCatFeatureToggleService = inject(ConfigCatFeatureToggleService);

  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: ParameterService,
    private secureStorage: AdlSecureStorageService,
    private facade: AppFacade
  ) {}

  fetchParameterEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchParameterAction),
      switchMap(() =>
        forkJoin(
          this.parameterTypes.map((key) =>
            this.service
              .fetchParameter(key.dashCase(), ParameterTypeExtension[key])
              .pipe(catchError(async () => await this.getCatalogueByKey(key)))
          )
        ).pipe(
          map((parameters) => this.mapCatalogue(parameters)),
          tap(async (catalogue) => await this.saveCatalogue(catalogue)),
          map((catalogue) =>
            actions.fetchParameterSuccessAction({ catalogue })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchParameterErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  public fetchParameterSuccessActionEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.fetchParameterSuccessAction),
        tap(async () => {
          const showOnBoarding = this.facade.featureFlagsByKey(
            FeatureFlagsKey.ShowOnBoarding
          );
          const appInfo = await AppPlugin.getInfo();
          const db = await this.secureStorage.getAll();
          const appVersion: string =
            getDBValue(db, SecureKeys.appVersion) ?? null;
          const isNewVersion: boolean = appVersion != appInfo.version;

          if (appVersion && isNewVersion) {
            if (showOnBoarding) {
              await this.secureStorage.remove(SecureKeys.denyOnboarding, true);
              await this.navCtrl.navigateRoot(ONBOARDING);
            }
          }
        })
      ),
    { dispatch: false }
  );

  fetchByKeyEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchByKeyAction),
      switchMap(({ key }) =>
        this.service
          .fetchParameter(key.dashCase(), ParameterTypeExtension[key])
          .pipe(
            map((data) => actions.fetchByKeySuccessAction({ key, data })),
            catchError((error: HttpErrorResponse) =>
              of(
                actions.fetchByKeyErrorAction({
                  message: error.message.toString()
                })
              )
            )
          )
      )
    )
  );

  fetchFeatureToggleEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchFeatureToggleAction),
      switchMap(() => {
        return from(this.secureStorage.getAll()).pipe(
          switchMap((db) => {
            const loginData = getDBValue(db, SecureKeys.loginData);

            const parsedData = loginData && JSON.parse(loginData);
            const { document: documentNumber = '' } = parsedData || {};
            const timestampSeconds = Math.floor(Date.now() / 1000);

            const getFeatureToggle$ = !isNullOrUndefinedOrEmpty(documentNumber)
              ? this.configCatFeatureToggleService.getAllValuesAsync({
                  identifier: documentNumber,
                  custom: { date: `${timestampSeconds}` }
                })
              : this.configCatFeatureToggleService.getAllValuesAsync();

            return getFeatureToggle$.pipe(
              map((data) => {
                const features = this.mapFeatureToggle(data);
                return actions.fetchFeatureToggleSuccessAction({
                  featureToggles: features
                });
              }),
              catchError((error: HttpErrorResponse) =>
                of(
                  actions.fetchFeatureToggleErrorAction({
                    message: `${error.message}`
                  })
                )
              )
            );
          })
        );
      })
    )
  );

  private mapFeatureToggle(
    data: { settingKey: any; settingValue: any }[]
  ): FeatureFlagsBm[] {
    return data.map(({ settingKey, settingValue }) => ({
      featureName: settingKey,
      value: settingValue
    }));
  }

  get parameterTypes(): string[] {
    return Object.keys(ParameterType).filter(
      (k) => k !== ParameterType.appVersions
    );
  }

  private mapCatalogue(parameters: any[]): ParameterList {
    return this.parameterTypes
      .map((key, index) => ({ [key]: parameters[index] }))
      .reduce(
        (beforeValue, value) => ({ ...beforeValue, ...value }),
        {}
      ) as ParameterList;
  }

  private async saveCatalogue(catalogue: ParameterList): Promise<void> {
    await this.secureStorage.put(
      SecureKeys.backupParameters,
      JSON.stringify(catalogue),
      true
    );
  }

  private async getCatalogueByKey(key: string): Promise<any> {
    const db = await this.secureStorage.getAll();
    const catalogue = JSON.parse(getDBValue(db, SecureKeys.backupParameters));
    return !isNullOrUndefined(catalogue) && !isNullOrUndefined(catalogue[key])
      ? catalogue[key]
      : [];
  }
}
