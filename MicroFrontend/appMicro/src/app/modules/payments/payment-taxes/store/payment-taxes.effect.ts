/* eslint-disable @typescript-eslint/dot-notation */
import { TitleCasePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  AgreementDetail,
  PaymentsAgreementsResponse,
  PaymentsCitiesResponse
} from '../entities/payment-taxes.interface';
import {
  mapPayTaxError,
  mapPayTaxResponse
} from '../pages/pay-tax/mappers/pay-tax-response.mapper';
import { PaymentTaxesService } from '../services/payment-taxes.service';
import * as featureActions from './payment-taxes.action';
import { mapError } from '@commons/helpers/http.helpers';
import { HttpStatus } from '@commons/constants/http.constants';

@Injectable()
export class PaymentTaxesEffect {
  constructor(
    private actions$: Actions,
    private service: PaymentTaxesService,
    private navCtrl: NavController,
    private titleCase: TitleCasePipe
  ) {}

  fetchCitiesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.fetchCities),
      switchMap(() =>
        this.service.fetchCities().pipe(
          map((data: PaymentsCitiesResponse) =>
            featureActions.fetchCitiesSuccess({
              list: !!data.agreementCities
                ? data.agreementCities.map((city) => ({
                    ...city,
                    name: this.titleCase.transform(city.name)
                  }))
                : []
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.fetchCitiesError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchAgreementEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.fetchAgreements),
      switchMap(({ city }) =>
        this.service.fetchAgreementsByCity(city).pipe(
          map((data: PaymentsAgreementsResponse) =>
            featureActions.fetchAgreementsSuccess({
              payload: !!data.agreements ? data.agreements : []
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.fetchAgreementsError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchAgreementDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.fetchReferenceValue),
      switchMap((action) =>
        this.service.fetchAgreementDetail(action.payload).pipe(
          map((response) => {
            const agreementDetail = response?.body as AgreementDetail;
            return !!agreementDetail && agreementDetail?.amount
              ? featureActions.fetchReferenceValueSuccess({
                  payload: agreementDetail
                })
              : featureActions.fetchReferenceNotFound({
                  message:
                    response.status ===
                      HttpStatus.NonAuthoritativeInformation &&
                    !!response.body['description']
                      ? response.body['description']
                      : null
                });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.fetchReferenceValueError({
                message: mapError(error, '')
              })
            )
          )
        )
      )
    )
  );

  makePaymentTaxesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.makePaymentTaxes),
      switchMap((action) =>
        this.service.paymentTax(action.payload).pipe(
          mergeMap((response) => [
            productActions.fetchProductsAction(),
            featureActions.makePaymentTaxesSuccess({
              props: mapPayTaxResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.makePaymentTaxesError({
                props: mapPayTaxError(error)
              })
            )
          )
        )
      )
    )
  );
}
