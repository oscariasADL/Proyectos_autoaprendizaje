import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import * as actions from './pfm.action';
import { PFMService } from '@modules/pfm/services/pfm.service';
import {
  PFMCategoriesOfMovements,
  PFMCategory,
  PFMCategoryType,
  PFMMovement,
  PFMProductTypeEnum
} from '@modules/pfm/entities/pfm.interface';
import { MovementState } from '@modules/movement/store/movement.state';
import { MovementFacade } from '@modules/movement/movement.facade';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { TypeAccount } from '@commons/entities/product/type-account';
import { PFMFacade } from '@modules/pfm/pfm.facade';

@Injectable()
export class PFMEffect {
  constructor(
    private actions$: Actions,
    private store: Store<MovementState>,
    private translate: TranslateService,
    private service: PFMService,
    private movementFacade: MovementFacade,
    private facade: PFMFacade
  ) {}

  fetchIncomeCategoriesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchIncomeCategories),
      switchMap(({ productType }) =>
        this.service
          .fetchCategoriesByType(PFMCategoryType.INCOME, productType)
          .pipe(
            mergeMap((categories: PFMCategory[]) => [
              actions.fetchIncomeCategoriesSuccess({ categories }),
              actions.fetchExpenseCategories({ productType })
            ]),
            catchError(() =>
              from([
                actions.fetchIncomeCategoriesError(),
                actions.fetchExpenseCategories({ productType })
              ])
            )
          )
      )
    )
  );

  fetchExpenseCategoriesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchExpenseCategories),
      switchMap(({ productType }) =>
        this.service
          .fetchCategoriesByType(PFMCategoryType.EXPENSE, productType)
          .pipe(
            map((categories: PFMCategory[]) =>
              actions.fetchExpenseCategoriesSuccess({ categories })
            ),
            catchError(() => of(actions.fetchExpenseCategoriesError()))
          )
      )
    )
  );

  getBalancesSummaryEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getBalancesSummary),
      switchMap(({ filters }) =>
        this.service.getBalancesSummary(filters).pipe(
          concatMap((balancesSummary) => [
            actions.getBalancesSummarySuccess({ balancesSummary }),
            actions.fetchCategoriesOfMovements({
              filters: {
                accountId:
                  filters.accountType === TypeAccount.CCA
                    ? balancesSummary[0].accountNumberCreditCard
                    : filters.accountId,
                startDate: filters.startDate,
                endDate: filters.endDate,
                productType: balancesSummary[0].type
              }
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(actions.getBalancesSummaryError())
          )
        )
      )
    )
  );

  fetchCategoriesOfMovementsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchCategoriesOfMovements),
      switchMap(({ filters }) =>
        this.service.fetchCategoriesOfMovements(filters).pipe(
          map((categoriesOfMovements: PFMCategoriesOfMovements[]) =>
            actions.fetchCategoriesOfMovementsSuccess({
              categoriesOfMovements
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(actions.fetchCategoriesOfMovementsError())
          )
        )
      )
    )
  );

  fetchMovementsByCategoryEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchMovementsByCategory),
      concatMap(({ filters }) =>
        this.service.fetchMovementsByCategory(filters).pipe(
          map((movements: PFMMovement[]) =>
            actions.fetchMovementsByCategorySuccess({
              categoryCode: filters.categoryCode,
              movements
            })
          ),
          catchError(() =>
            of(
              actions.fetchMovementsByCategoryError({
                categoryCode: filters.categoryCode
              })
            )
          )
        )
      )
    )
  );

  changeCategoryEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeCategory),
      withLatestFrom(
        this.movementFacade.movementsHistoryPayload$,
        this.facade.balancesSummary$
      ),
      switchMap(([action, filters, [balanceSummary]]) =>
        this.service.changeCategory(action.changeCategoryPayload).pipe(
          mergeMap(() => [
            actions.resetMovementsByCategory(),
            actions.getBalancesSummary({
              filters: {
                accountId: filters.id,
                accountType:
                  balanceSummary.type === PFMProductTypeEnum.TC
                    ? TypeAccount.CCA
                    : TypeAccount.SDA,
                startDate: filters.params.startDate,
                endDate: filters.params.endDate
              }
            }),
            actions.changeCategorySuccess({
              props: {
                type: ToastType.success,
                title: this.translate.instant(
                  'PFM.CHANGE_CATEGORY.RESULT.SUCCESS'
                )
              }
            })
          ]),
          catchError(() => {
            return of(
              actions.changeCategoryError({
                props: {
                  type: ToastType.error,
                  title: this.translate.instant(
                    'PFM.CHANGE_CATEGORY.RESULT.ERROR'
                  )
                }
              })
            );
          })
        )
      )
    )
  );

  AdviserStartConversationEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.adviserStartConversation),
      switchMap(() =>
        this.service.adviserStartConversation().pipe(
          map((response: any) =>
            actions.adviserStartConversationSuccess({
              accessToken: response.accessToken
            })
          ),
          catchError(() => of(actions.adviserStartConversationError()))
        )
      )
    )
  );
}
