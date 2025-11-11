import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductDetail } from '../entities/product-detail.entity';
import { ProductDetailService } from '../services/product-detail.service';
import * as featureActions from './product-detail.actions';

@Injectable()
export class ProductDetailEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: ProductDetailService
  ) {}

  fetchProductDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.fetchProductDetailAction),
      switchMap((action) =>
        this.service.fetchProductDetail(action.id).pipe(
          map((data: ProductDetail) =>
            featureActions.fetchProductDetailSuccessAction({
              data,
              id: action.id
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.fetchProductDetailErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchProductPayrollAdvanceEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.fetchProductPayrollAdvanceAction),
      switchMap((action) =>
        this.service.fetchProductPayrollAdvance(action.productNumber).pipe(
          map((data: any) =>
            featureActions.fetchProductPayrollAdvanceSuccessAction({
              data: {
                payrollAdvanceNumberProduct: data.numberProduct,
                payrollAdvanceAmount: data.amount,
                payrollAdvanceIsPreApproved: data.isPreApproved
              }
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.fetchProductPayrollAdvanceErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchProductPayrollAdvanceConfirmEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(featureActions.fetchProductPayrollAdvanceConfirmAction),
        switchMap((action) =>
          this.service
            .fetchProductPayrollAdvanceConfirm(
              action.productNumber,
              action.totalAmount
            )
            .pipe(
              map((data: any) =>
                featureActions.fetchProductPayrollAdvanceConfirmSuccessAction({
                  data: {
                    payrollAdvanceAuthorizationNumber: data.numAutorization
                  }
                })
              ),
              catchError((error: HttpErrorResponse) =>
                of(
                  featureActions.fetchProductPayrollAdvanceConfirmErrorAction({
                    message: error.message.toString()
                  })
                )
              )
            )
        )
      )
  );
}
