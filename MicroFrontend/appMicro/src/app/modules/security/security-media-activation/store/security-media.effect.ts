import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpStatus } from '@commons/constants/http.constants';
import { mapError } from '@commons/helpers/http.helpers';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { mapMediaTextInfo } from '@modules/security/security-media-activation/mappers/security-media-activation.mapper';
import * as securityConfigActions from '@modules/security/security-media-activation/store/security-media.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  ActivationProduct,
  ProductTypeActivation,
  SuspiciousTransaction
} from '../entities/security-media.interface';
import { SecurityMediaActivationService } from '../services/security-media-activation.service';
import * as featureActions from './security-media.action';
import { ActivateProductSteps } from './security-media.state';
import { ToastType } from '@commons/entities/toast/toast.entities';
import {
  mapBlockProductTemporarilyError,
  mapUnBlockProductError
} from '@modules/security/security-media-activation/constants/security-media-activation.constants';
import { NavController } from '@ionic/angular';

@Injectable()
export class SecurityMediaActivationEffect {
  constructor(
    private actions$: Actions,
    private service: SecurityMediaActivationService,
    private navCtrl: NavController
  ) {}

  fetchActivationEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.fetchProducts),
      switchMap(() =>
        this.service.fetchActivations().pipe(
          map((data: ActivationProduct[]) =>
            featureActions.fetchProductsSuccess({
              payload: data.map((p) => ({
                ...p,
                name:
                  ProductTypeActivation[p.activationType] ||
                  ProductTypeActivation.D,
                textInfo: mapMediaTextInfo(p),
                ...(ProductTypeActivation[p.activationType] ===
                ProductTypeActivation.R
                  ? {
                      cardFranchise: 'MASTERDEBIT',
                      cardType: p?.cardType ? p?.cardType : 'Classic'
                    }
                  : {})
              }))
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.fetchProductsError({
                payload: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  activateProductEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.activateProduct),
      switchMap((action) =>
        this.service.activateProduct(action.payload).pipe(
          mergeMap(() => [
            securityConfigActions.fetchProducts(),
            featureActions.activateProductSetStep({
              step: ActivateProductSteps.success
            })
          ]),
          catchError((response: HttpErrorResponse) =>
            of(
              featureActions.activateProductSetStep({
                step: ActivateProductSteps.error,
                message: mapError(response)
              })
            )
          )
        )
      )
    )
  );

  blockProductEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.blockProduct),
      switchMap((action) =>
        this.service.blockProduct(action.id).pipe(
          mergeMap(() => [
            securityConfigActions.fetchProducts(),
            featureActions.activateProductSetStep({
              step: ActivateProductSteps.success
            })
          ]),
          catchError((response: HttpErrorResponse) =>
            of(
              featureActions.activateProductSetStep({
                step: ActivateProductSteps.error,
                message: mapError(response)
              })
            )
          )
        )
      )
    )
  );

  temporaryBlockEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.temporaryBlockProduct),
      switchMap((action) =>
        this.service.temporaryBlock(action.payload).pipe(
          mergeMap(() => [
            securityConfigActions.fetchProducts(),
            featureActions.activateProductSetStep({
              step: ActivateProductSteps.success
            })
          ]),
          catchError((response: HttpErrorResponse) =>
            of(
              featureActions.activateProductSetStep({
                step: ActivateProductSteps.error,
                message: mapError(response)
              })
            )
          )
        )
      )
    )
  );

  temporaryBlockV2Effect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.temporaryBlockProductV2),
      switchMap((action) =>
        this.service.temporaryBlock(action.payload).pipe(
          tap(() => this.navCtrl.pop()),
          mergeMap(() => [
            securityConfigActions.fetchProducts(),
            securityConfigActions.temporaryBlockProductV2SuccessAction({
              props: {
                type: ToastType.success,
                title: 'BLOCK_CARD_TEMPORARILY.SUCCESS.TITLE'
              }
            })
          ]),
          catchError((response: HttpErrorResponse) =>
            of(
              securityConfigActions.temporaryBlockProductV2ErrorAction({
                props: mapBlockProductTemporarilyError(response)
              })
            )
          )
        )
      )
    )
  );

  unlockProductEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.unlockProduct),
      switchMap((action) =>
        this.service.unblockProduct(action.product).pipe(
          mergeMap(() => [
            securityConfigActions.fetchProducts(),
            featureActions.activateProductSetStep({
              step: ActivateProductSteps.success
            })
          ]),
          catchError((response: HttpErrorResponse) =>
            of(
              featureActions.activateProductSetStep({
                step: ActivateProductSteps.error,
                message: mapError(response)
              })
            )
          )
        )
      )
    )
  );

  unlockProductV2Effect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.unlockProductV2Action),
      switchMap((action) =>
        this.service.unblockProduct(action.product).pipe(
          tap(() => this.navCtrl.pop()),
          mergeMap(() => [
            securityConfigActions.fetchProducts(),
            securityConfigActions.unlockProductV2SuccessAction({
              props: {
                type: ToastType.success,
                title: 'BLOCK_CARD_TEMPORARILY.SUCCESS.TITLE_UNBLOCK'
              }
            })
          ]),
          catchError((response: HttpErrorResponse) =>
            of(
              securityConfigActions.unlockProductV2ErrorAction({
                props: mapUnBlockProductError(response)
              })
            )
          )
        )
      )
    )
  );

  fetchSuspiciousTransactionEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.suspiciousTransaction),
      switchMap((action) =>
        this.service.suspiciousTransaction(action.product).pipe(
          map((response: HttpResponse<SuspiciousTransaction>) => {
            if (response.status === HttpStatus.NoContent) {
              throw new HttpErrorResponse({
                status: HttpStatus.ServiceUnavailable
              });
            } else {
              return featureActions.suspiciousTransactionSuccess({
                suspiciousTransaction:
                  !isNullOrUndefined(response.body) &&
                  Object.keys(response.body).length > 0
                    ? response.body
                    : null
              });
            }
          }),
          catchError((response: HttpErrorResponse) =>
            of(
              featureActions.suspiciousTransactionError({
                message: mapError(response)
              })
            )
          )
        )
      )
    )
  );
}
