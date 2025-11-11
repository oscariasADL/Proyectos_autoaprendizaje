import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';

import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import {
  MovementsByCategory,
  PFMBalance,
  PFMCategory,
  PFMChangeCategoryPayload,
  PFMExpenseIncomeCategories,
  PFMFilterPayload,
  PFMMovement,
  PFMMovementByCategoryFilterPayload,
  PFMProductTypeEnum
} from '@modules/pfm/entities/pfm.interface';
import { select } from '@ngrx/store';

@Injectable()
export class PFMFacadeMock extends AppFacadeMock {
  public incomeCategories$: Observable<PFMCategory[]> = new BehaviorSubject([]);

  public expenseCategories$: Observable<PFMCategory[]> = new BehaviorSubject(
    []
  );

  public balancesSummary$: Observable<PFMBalance[]> = new BehaviorSubject([]);

  public balancesWorking$: Observable<boolean> = of(false);

  public balancesCompleted$: Observable<boolean> = of(true);

  public categoriesOfMovementsWorking$: Observable<boolean> = of(false);

  public categoriesOfMovementsCompleted$: Observable<boolean> = of(true);

  public allMovementsByCategory$: Observable<MovementsByCategory[]> =
    new BehaviorSubject([]);

  public groupedIncomeCategories$(
    accountId: string
  ): Observable<PFMExpenseIncomeCategories> {
    return new BehaviorSubject<PFMExpenseIncomeCategories>(null);
  }

  public groupedExpenseCategories$(
    accountId: string
  ): Observable<PFMExpenseIncomeCategories> {
    return new BehaviorSubject<PFMExpenseIncomeCategories>(null);
  }

  public movementsByCategory$(categoryCode: string): Observable<PFMMovement[]> {
    return new BehaviorSubject<PFMMovement[]>(null);
  }

  public fetchIncomeCategories(productType: PFMProductTypeEnum): void {}

  public getBalancesSummary(filters: PFMFilterPayload): void {}

  public fetchCategoriesOfMovements(filters: PFMFilterPayload): void {}

  public fetchMovementsByCategory(
    filters: PFMMovementByCategoryFilterPayload
  ): void {}

  public changeCategory(
    changeCategoryPayload: PFMChangeCategoryPayload
  ): void {}

  public advisorStartConversation(): void {}

  public reset(): void {}

  public resetMovementsByCategory(): void {}

  public isAdvisorWorking$: Observable<boolean> = of(false);

  public isAdvisorCompleted$: Observable<boolean> = of(false);

  public getAdviserAccessToken$: Observable<string> = of('dsadada');
}
