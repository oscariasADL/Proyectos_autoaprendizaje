import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';
import { NavController } from '@ionic/angular';
import {
  mapPayLoanError,
  mapPayLoanResponse
} from '@modules/payments/payment-credits/mappers/pay-loan-response.mapper';
import { SearchBillReferenceResponse } from '@modules/payments/payment-services/entities/register-service.interface';
import {
  Contributor,
  SocialSecurityPinResponse
} from '@modules/payments/payment-social-security/entities/social-security.interface';
import {
  mapSocialSecurityError,
  mapSocialSecurityResponse
} from '@modules/payments/payment-social-security/mappers/social-security-response.mapper';
import { PaymentSocialSecurityService } from '@modules/payments/payment-social-security/services/payment-social-security.service';
import * as actions from '@modules/payments/payment-social-security/store/payment-social-security.actions';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PaymentSocialSecurityEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: PaymentSocialSecurityService
  ) {}

  fetchContributorEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchContributorAction),
      switchMap(() =>
        this.service.fetchContributors().pipe(
          map((contributors: Contributor[]) =>
            actions.fetchContributorSuccessAction({ contributors })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchContributorErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchSocialSecurityDataByPinEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchSocialSecurityDataByPinAction),
      switchMap((action) =>
        this.service.fetchSocialSecurityDataByPin(action.payload).pipe(
          map((data: SocialSecurityPinResponse) =>
            actions.fetchSocialSecurityDataByPinSuccessAction({ data })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchSocialSecurityDataByPinErrorAction({
                message: mapError(error)
              })
            )
          )
        )
      )
    )
  );

  fetchSocialSecurityDataByReferenceEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.fetchSocialSecurityDataByReferenceAction),
        switchMap((action) =>
          this.service.fetchSocialSecurityDataByReference(action.payload).pipe(
            map((data: SearchBillReferenceResponse) =>
              actions.fetchSocialSecurityDataByReferenceSuccessAction({ data })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                actions.fetchSocialSecurityDataByReferenceErrorAction({
                  message: mapError(error)
                })
              )
            )
          )
        )
      )
  );

  paySocialSecurityEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.paySocialSecurityAction),
      switchMap((action) =>
        this.service.paySocialSecurity(action.payload).pipe(
          mergeMap((response: any) => [
            productActions.fetchProductsAction(),
            actions.paySocialSecuritySuccessAction({
              props: mapSocialSecurityResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.paySocialSecurityErrorAction({
                props: mapSocialSecurityError(error)
              })
            )
          )
        )
      )
    )
  );
}
