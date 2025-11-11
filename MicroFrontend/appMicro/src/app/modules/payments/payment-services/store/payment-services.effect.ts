import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GenericResponse,
  SuccessResponse
} from '@commons/entities/response/response.interface';
import { stringToJSON } from '@commons/helpers/http.helpers';
import { NavController } from '@ionic/angular';
import { PaymentServicesError } from '@modules/payments/payment-services/constants/payment-services.constants';
import { PaymentServicesResponse } from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  mapServicesPayError,
  mapServicesPayResponse
} from '@modules/payments/payment-services/pages/payment-services-pay/mappers/services-pay-response.mapper';
import * as actions from '@modules/payments/payment-services/store/payment-services.actions';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { ServiceData } from '../entities/register-service.interface';
import { PaymentServicesService } from '../services/payment-services.service';
import {
  mapPaymentServiceCreateSchedulingError,
  mapPaymentServiceCreateSchedulingResponse,
  mapPaymentServiceDeleteSchedulingError,
  mapPaymentServiceDeleteSchedulingResponse,
  mapPaymentServiceEditSchedulingError,
  mapPaymentServiceEditSchedulingResponse
} from '@modules/payments/payment-services/pages/payment-services-create-scheduling/mappers/payment-service-create-scheduling.mapper';
import { SERVICES } from '@commons/constants/navigate.constants';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { PayBillsMultipleResponse } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/entities/services-pay-multiple.interface';
import {
  mapServicesPayMultipleFailedResponse,
  mapServicesPayMultipleSuccessResponse
} from '@modules/payments/payment-services/pages/payment-services-pay-multiple/mappers/services-pay-multiple-response.mapper';

@Injectable()
export class PaymentServicesEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private navCtrl: NavController,
    private service: PaymentServicesService,
    private facade: PaymentServicesFacade
  ) {}

  fetchPaymentServiceEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPaymentServicesAction),
      switchMap((action) =>
        this.service.fetchPaymentServices().pipe(
          map((services: PaymentServicesResponse) =>
            actions.fetchPaymentServicesSuccessAction({ services })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchPaymentServicesErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  payBillEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.payBillAction),
      switchMap((action) =>
        this.service.payBill(action.payload, action.isRegistered).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            actions.fetchPaymentServicesAction(),
            actions.payBillSuccessAction({
              props: mapServicesPayResponse(
                action.payload,
                response,
                action.data.voucher
              )
            })
          ]),
          tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.payBillErrorAction({
                props: mapServicesPayError(error)
              })
            )
          )
        )
      )
    )
  );

  payBillsMultipleEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.payBillsMultipleAction),
      switchMap((action) =>
        this.service.payBillsMultiple(action.payload).pipe(
          mergeMap((response: PayBillsMultipleResponse) => {
            const paymentBillList = response?.paymentBillList || [];
            const payBillsMultipleFailed = paymentBillList.filter(
              (paymentBill) => !paymentBill.statusPayment
            );

            if (payBillsMultipleFailed.length === paymentBillList.length) {
              return [
                actions.payBillsMultipleErrorAction({
                  props: mapServicesPayMultipleFailedResponse(response)
                })
              ];
            }

            return [
              productActions.fetchProductsAction(),
              actions.fetchPaymentServicesAction(),
              actions.payBillsMultipleSuccessAction({
                props: mapServicesPayMultipleSuccessResponse(
                  response,
                  action.data.voucher
                )
              })
            ];
          }),
          tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) => {
            return of(
              actions.payBillsMultipleErrorAction({
                props: mapServicesPayError(error)
              })
            );
          })
        )
      )
    )
  );

  searchCategoryEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchCategory),
      switchMap((action) =>
        this.service.searchCategories(action.query.trim()).pipe(
          map((resp: ServiceData[]) => {
            return actions.searchCategorySuccess({
              payload: resp
            });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.searchCategoryError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  searchBillReferenceEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.searchBillReference),
      switchMap(({ payload }) =>
        this.service.searchBillReference(payload).pipe(
          map((referenceInfo) =>
            actions.searchBillReferenceSuccess({ referenceInfo })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.searchBillReferenceError(this.validateErrorMessage(error))
            )
          )
        )
      )
    );
  });

  createBillSchedulingEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createBillSchedulingAction),
      withLatestFrom(this.facade.billScheduledPayload$),
      switchMap(([action, bill]) =>
        this.service.createScheduling(bill).pipe(
          mergeMap((response: GenericResponse) => [
            actions.fetchPaymentServicesAction(),
            actions.createBillSchedulingSuccessAction({
              props: mapPaymentServiceCreateSchedulingResponse(
                response,
                action.data
              )
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.createBillSchedulingErrorAction({
                props: mapPaymentServiceCreateSchedulingError(error)
              })
            )
          ),
          finalize(() => this.navCtrl.navigateForward(SERVICES))
        )
      )
    )
  );

  editBillSchedulingEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.editBillSchedulingAction),
      withLatestFrom(this.facade.billScheduledPayload$),
      switchMap(([action, bill]) =>
        this.service.editScheduling(bill).pipe(
          mergeMap((response: GenericResponse) => [
            actions.fetchPaymentServicesAction(),
            actions.editBillSchedulingSuccessAction({
              props: mapPaymentServiceEditSchedulingResponse(action.data)
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.editBillSchedulingErrorAction({
                props: mapPaymentServiceEditSchedulingError(error)
              })
            )
          ),
          finalize(() => this.navCtrl.navigateForward(SERVICES))
        )
      )
    )
  );

  deleteBillSchedulingEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteBillSchedulingAction),
      withLatestFrom(this.facade.billScheduledPayload$),
      switchMap(([action, bill]) =>
        this.service.deleteScheduling(bill).pipe(
          mergeMap((response: GenericResponse) => [
            actions.fetchPaymentServicesAction(),
            actions.deleteBillSchedulingSuccessAction({
              props: mapPaymentServiceDeleteSchedulingResponse(action.data)
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.deleteBillSchedulingErrorAction({
                props: mapPaymentServiceDeleteSchedulingError(error)
              })
            )
          ),
          finalize(() => this.navCtrl.navigateForward(SERVICES))
        )
      )
    )
  );

  private validateErrorMessage(response: HttpErrorResponse): {
    message: string;
    hasErrorMessage: boolean;
  } {
    const OVERPAID_BILL_CODE = 1380;
    const EXPIRED_BILL_CODE = [9999, 1400];
    const error = stringToJSON(response.error);
    if (!!response && !!response.error) {
      const code = +error.code;
      if (code === OVERPAID_BILL_CODE) {
        return {
          message: PaymentServicesError.alreadyPaid,
          hasErrorMessage: true
        };
      }
      if (EXPIRED_BILL_CODE.includes(code)) {
        return {
          message: PaymentServicesError.deadlineExpired,
          hasErrorMessage: true
        };
      }
    }
    return {
      message: response.message.toString(),
      hasErrorMessage: false
    };
  }
}
