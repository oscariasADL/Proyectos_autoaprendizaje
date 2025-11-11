import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { SecureKeys } from '@commons/constants/keys.constants';
import { TypeProduct } from '@commons/entities/product/balance.interface';
import {
  mapErrorAlert,
  throwErrorResponseIfNecessary
} from '@commons/helpers/http.helpers';
import { getDBValue } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import {
  INACTIVE_CHANNEL_BALANCE_CODE,
  INACTIVE_CHANNEL_HTTP_CODE,
  NO_PRODUCTS_CODE,
  NO_PRODUCTS_HTTP_CODE
} from '@modules/auth/login/constants/login.constants';
import * as loginActions from '@modules/auth/login/store/login.actions';
import { ProductNickname } from '@modules/product/entities/product-nickname.interface';
import { ProductService } from '@modules/product/services/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './product.actions';
import { HomeFacade } from '@modules/home/home.facade';
import { AppFacade } from '@app/app.facade';
import { ProductSpiUserKey } from '@modules/product/entities/product-spi-user-key';
import { ProductSpiConsentResponse } from '../entities/product-spi.interface';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { sortUserKeysByAccountTypeAndPriority } from '../mappers/product-home.mapper';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private service: ProductService,
    private spiConsentService: SpiConsentService,
    private secureStorage: AdlSecureStorageService,
    private homeFacade: HomeFacade,
    private appFacade: AppFacade
  ) {}

  fetchProductsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchProductsAction),
      switchMap((_) => {
        this.homeFacade.setHomeTimer(0);
        return this.service.fetchBalance().pipe(
          withLatestFrom(this.appFacade.basicData$),
          tap(([balance, userData]) => {
            const creditProducts = balance
              ?.filter(
                (item) => item?.typeProduct === TypeProduct.MY_CREDIT_CARDS
              )
              ?.flatMap((item) => item?.products);
            const shouldSetError =
              balance && !creditProducts?.length && userData?.hasCreditProducts;
            this.homeFacade.setCreditProductsError(shouldSetError);
          }),
          tap(([balance]) => throwErrorResponseIfNecessary(balance)),
          map(([balance]) => {
            return actions.fetchProductsSuccessAction({ balance });
          }),
          tap(() => {
            const userData = this.homeFacade.userData$.currentValue();
            const firstCall = this.homeFacade.firstCall$.currentValue();
            if (userData?.dataBasicClientDto?.hasDigitalCard && firstCall) {
              this.homeFacade.fetchDigitalDebitCards();
              this.homeFacade.fetchProductsFirstCallToggleAction();
            }
          }),
          catchError((response: HttpErrorResponse) => {
            return of(
              response.status === INACTIVE_CHANNEL_HTTP_CODE &&
                response?.error?.code === INACTIVE_CHANNEL_BALANCE_CODE
                ? loginActions.inactiveChannelAction()
                : response.status === NO_PRODUCTS_HTTP_CODE &&
                  response?.error?.code === NO_PRODUCTS_CODE
                ? loginActions.noProductsErrorAction({
                    message: response?.error?.description
                  })
                : actions.fetchProductsErrorAction({
                    message: mapErrorAlert(response)
                  })
            );
          })
        );
      })
    )
  );

  fetchProductsWithoutReloadEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchProductsWithoutReloadAction),
      switchMap((_) => {
        return this.service.fetchBalance(true).pipe(
          withLatestFrom(this.appFacade.basicData$),
          tap(([balance, userData]) => {
            const creditProducts = balance
              ?.filter(
                (item) => item?.typeProduct === TypeProduct.MY_CREDIT_CARDS
              )
              .flatMap((item) => item?.products);
            const shouldSetError =
              !creditProducts?.length && userData?.hasCreditProducts;
            this.homeFacade.setCreditProductsError(shouldSetError);
          }),
          tap(([balance]) => throwErrorResponseIfNecessary(balance)),
          map(([balance]) =>
            actions.fetchProductsWithoutReloadSuccessAction({ balance })
          ),
          catchError((response: HttpErrorResponse) =>
            of(
              response.status === INACTIVE_CHANNEL_HTTP_CODE &&
                response?.error?.code === INACTIVE_CHANNEL_BALANCE_CODE
                ? loginActions.inactiveChannelAction()
                : actions.fetchProductsErrorAction({
                    message: mapErrorAlert(response)
                  })
            )
          )
        );
      })
    )
  );

  fetchProductsWithoutReloadSuccessEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.fetchProductsWithoutReloadSuccessAction),
        mergeMap(() => [
          actions.fetchProductsNicknamesAction(),
          actions.fetchProductSpiUserKeysAction()
        ])
      )
  );

  fetchProductsNicknamesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchProductsNicknamesAction),
      switchMap((_) =>
        this.service.fetchNicknames().pipe(
          map((nicknames: ProductNickname[]) =>
            actions.fetchProductsNicknamesSuccessAction({ nicknames })
          ),
          catchError(() => of(actions.fetchProductsNicknamesErrorAction()))
        )
      )
    )
  );

  fetchProductSpiUserKeysEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchProductSpiUserKeysAction),
      switchMap((_) =>
        this.service.fetchSpiUserKeys().pipe(
          map((spiUserKeys: ProductSpiUserKey[]) =>
            actions.fetchProductSpiUserKeysSuccessAction({ spiUserKeys })
          ),
          catchError(() => {
            this.secureStorage.put(
              SecureKeys.tagAval,
              JSON.stringify(''),
              true
            );
            return of(actions.fetchProductSpiUserKeysErrorAction());
          })
        )
      )
    )
  );
  fetchProductSpiUserKeysSuccessEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchProductSpiUserKeysSuccessAction),
      switchMap(({ spiUserKeys }) => {
        if (spiUserKeys.length === 0) {
          this.secureStorage.put(
            SecureKeys.tagAval,
            JSON.stringify(null),
            true
          );
          return [];
        }
        if (Array.isArray(spiUserKeys) && spiUserKeys.length > 0) {
          const sortedKeys = sortUserKeysByAccountTypeAndPriority(spiUserKeys);
          const [userKey] = sortedKeys;
          const tag = { type: userKey.keyType, value: userKey.keyId };

          this.secureStorage.put(SecureKeys.tagAval, JSON.stringify(tag), true);
          return [];
        }
      })
    )
  );

  setHiddenBalanceEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.setHiddenBalanceAction),
      switchMap(({ hiddenBalance }) =>
        defer(async () => {
          const data = await this.secureStorage.put(
            SecureKeys.hiddenBalances,
            hiddenBalance.toString(),
            true
          );
          if (data) {
            return actions.setHiddenBalanceSuccessAction({ hiddenBalance });
          }
        })
      )
    )
  );

  getHiddenBalanceFromSecureStorageEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.getHiddenBalanceFromSecureStorageAction),
        switchMap(() =>
          defer(async () => {
            let hiddenBalance = false;
            const db = await this.secureStorage.getAll();
            if (!!getDBValue(db, SecureKeys.hiddenBalances)) {
              hiddenBalance = JSON.parse(
                getDBValue(db, SecureKeys.hiddenBalances)
              );
            }
            return actions.setHiddenBalanceSuccessAction({ hiddenBalance });
          })
        )
      )
  );

  fetchSPIAuthorizationEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchSPIAuthorizationAction),
      switchMap(() =>
        this.service.fetchSpiAuthorization().pipe(
          map(({ statusConsent }: ProductSpiConsentResponse) => {
            return !statusConsent
              ? actions.fetchSPIAuthorizationSuccessAction({ status: true })
              : actions.userWithConsentAcceptedAction();
          }),
          catchError((error) => {
            return of(actions.fetchProductSpiUserKeysErrorAction());
          })
        )
      )
    )
  );

  showSpiConsentModalOnAuthorizationSuccess$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.fetchSPIAuthorizationSuccessAction),
        tap(({ status }) => {
          this.secureStorage.put(SecureKeys.isSpiConsentCalled, 'true', true);

          if (status) {
            this.spiConsentService.presentSpiConsentModal();
          }
        })
      ),
    {
      dispatch: false
    }
  );

  userWithConsentAcceptedEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.userWithConsentAcceptedAction),
        tap(() => {
          this.secureStorage.put(SecureKeys.spiAuthorization, 'true', true);
        })
      ),
    {
      dispatch: false
    }
  );

  acceptSpiConsentEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.acceptSpiConsentAction),
      switchMap(() =>
        this.service.acceptSpiConsent().pipe(
          tap(() => {
            this.secureStorage.put(SecureKeys.spiAuthorization, 'true', true);
          }),
          map(() => actions.acceptSpiConsentSuccessAction()),
          catchError((error: HttpErrorResponse) => {
            return of(actions.acceptSpiConsentErrorAction());
          })
        )
      )
    )
  );
}
