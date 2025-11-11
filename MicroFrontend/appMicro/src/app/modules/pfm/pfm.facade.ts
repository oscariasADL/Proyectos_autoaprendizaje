import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppFacade } from '@app/app.facade';
import {
  adviserStartConversation,
  changeCategory,
  fetchCategoriesOfMovements,
  fetchIncomeCategories,
  fetchMovementsByCategory,
  getBalancesSummary,
  reset,
  resetMovementsByCategory
} from '@modules/pfm/store/pfm.action';
import {
  adviserAccessToken,
  adviserChatHistory,
  adviserCompleted,
  adviserWorking,
  allMovementsByCategory,
  balancesCompleted,
  balancesSummary,
  balancesWorking,
  categoriesOfMovementsCompleted,
  categoriesOfMovementsWorking,
  expenseCategories,
  groupedExpenseCategories,
  groupedIncomeCategories,
  incomeCategories,
  movementsByCategory
} from '@modules/pfm/store/pfm.selector';
import {
  MovementsByCategory,
  PFMAdviserMessage,
  PFMBalance,
  PFMCategory,
  PFMChangeCategoryPayload,
  PFMExpenseIncomeCategories,
  PFMFilterBalanceSummaryPayload,
  PFMFilterCategoriesOfMovements,
  PFMFilterPayload,
  PFMMovement,
  PFMMovementByCategoryFilterPayload,
  PFMProductTypeEnum
} from '@modules/pfm/entities/pfm.interface';

@Injectable()
export class PFMFacade extends AppFacade {
  public incomeCategories$: Observable<PFMCategory[]> = this.store.pipe(
    select(incomeCategories)
  );

  public expenseCategories$: Observable<PFMCategory[]> = this.store.pipe(
    select(expenseCategories)
  );

  public balancesSummary$: Observable<PFMBalance[]> = this.store.pipe(
    select(balancesSummary)
  );

  public balancesWorking$: Observable<boolean> = this.store.pipe(
    select(balancesWorking)
  );

  public balancesCompleted$: Observable<boolean> = this.store.pipe(
    select(balancesCompleted)
  );

  public categoriesOfMovementsWorking$: Observable<boolean> = this.store.pipe(
    select(categoriesOfMovementsWorking)
  );

  public categoriesOfMovementsCompleted$: Observable<boolean> = this.store.pipe(
    select(categoriesOfMovementsCompleted)
  );

  public allMovementsByCategory$: Observable<MovementsByCategory[]> =
    this.store.pipe(select(allMovementsByCategory));

  public groupedIncomeCategories$(
    accountId: string
  ): Observable<PFMExpenseIncomeCategories> {
    return this.store.pipe(select(groupedIncomeCategories(), accountId));
  }

  public groupedExpenseCategories$(
    accountId: string
  ): Observable<PFMExpenseIncomeCategories> {
    return this.store.pipe(select(groupedExpenseCategories(), accountId));
  }

  public movementsByCategory$(categoryCode: string): Observable<PFMMovement[]> {
    return this.store.pipe(select(movementsByCategory(), categoryCode));
  }

  public fetchIncomeCategories(productType: PFMProductTypeEnum): void {
    this.store.dispatch(fetchIncomeCategories({ productType }));
  }

  public getBalancesSummary(filters: PFMFilterBalanceSummaryPayload): void {
    this.store.dispatch(getBalancesSummary({ filters }));
  }

  public fetchCategoriesOfMovements(
    filters: PFMFilterCategoriesOfMovements
  ): void {
    this.store.dispatch(fetchCategoriesOfMovements({ filters }));
  }

  public fetchMovementsByCategory(
    filters: PFMMovementByCategoryFilterPayload
  ): void {
    this.store.dispatch(
      fetchMovementsByCategory({
        filters
      })
    );
  }

  public changeCategory(changeCategoryPayload: PFMChangeCategoryPayload): void {
    this.store.dispatch(changeCategory({ changeCategoryPayload }));
  }

  public reset(): void {
    this.store.dispatch(reset());
  }

  public resetMovementsByCategory(): void {
    this.store.dispatch(resetMovementsByCategory());
  }

  public advisorStartConversation(): void {
    this.store.dispatch(adviserStartConversation());
  }

  public isAdvisorWorking$: Observable<boolean> =
    this.store.select(adviserWorking);

  public isAdvisorCompleted$: Observable<boolean> =
    this.store.select(adviserCompleted);

  public getAdviserAccessToken$: Observable<string> =
    this.store.select(adviserAccessToken);

  public getAdviserHistoryChat$: Observable<PFMAdviserMessage[]> =
    this.store.select(adviserChatHistory);
}
