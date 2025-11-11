import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PFMModuleName, PFMState } from '@modules/pfm/store/pfm.state';
import {
  MovementsByCategory,
  PFMCategoriesOfMovements,
  PFMCategoryType,
  PFMExpenseIncomeCategories,
  PFMMovement
} from '@modules/pfm/entities/pfm.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { getMovementsByCategory } from '@modules/pfm/helpers/pfm.helpers';

const PFMModuleState = createFeatureSelector<PFMState>(PFMModuleName);

export const incomeCategories = createSelector(
  PFMModuleState,
  (state: PFMState) => state.incomeCategories
);

export const expenseCategories = createSelector(
  PFMModuleState,
  (state: PFMState) => state.expenseCategories
);

export const balancesSummary = createSelector(
  PFMModuleState,
  (state: PFMState) => state.balancesSummary
);

export const balancesWorking = createSelector(
  PFMModuleState,
  (state: PFMState) => state.balancesWorking
);

export const balancesCompleted = createSelector(
  PFMModuleState,
  (state: PFMState) => state.balancesCompleted
);

export const categoriesOfMovements = createSelector(
  PFMModuleState,
  (state: PFMState) => state.categoriesOfMovements
);

export const categoriesOfMovementsWorking = createSelector(
  PFMModuleState,
  (state: PFMState) => state.categoriesOfMovementsWorking
);

export const categoriesOfMovementsCompleted = createSelector(
  PFMModuleState,
  (state: PFMState) => state.categoriesOfMovementsCompleted
);

export const allMovementsByCategory = createSelector(
  PFMModuleState,
  (state: PFMState) => state.movementsByCategory
);

export const adviserWorking = createSelector(
  PFMModuleState,
  (state: PFMState) => state.adviserAval.working
);

export const adviserCompleted = createSelector(
  PFMModuleState,
  (state: PFMState) => state.adviserAval.completed
);

export const adviserAccessToken = createSelector(
  PFMModuleState,
  (state: PFMState) => state.adviserAval.accessToken
);

export const adviserChatHistory = createSelector(
  PFMModuleState,
  (state: PFMState) => state.adviserAval.chatHistory
);

export const movementsByCategory = () =>
  createSelector(allMovementsByCategory, _getMovementsByCategory);

export const groupedIncomeCategories = () =>
  createSelector(
    categoriesOfMovements,
    () => PFMCategoryType.INCOME,
    _getIncomeExpenseCategoriesForAccount
  );

export const groupedExpenseCategories = () =>
  createSelector(
    categoriesOfMovements,
    () => PFMCategoryType.EXPENSE,
    _getIncomeExpenseCategoriesForAccount
  );

function _getIncomeExpenseCategoriesForAccount(
  _categoriesOfMovements: PFMCategoriesOfMovements[],
  categoryType: PFMCategoryType
): PFMExpenseIncomeCategories {
  if (!!!_categoriesOfMovements) {
    return null;
  }

  const incomeExpenseCategories = {
    total: null,
    previousTotal: null,
    categories: []
  };

  _categoriesOfMovements.forEach((item) => {
    if (
      categoryType === PFMCategoryType.INCOME &&
      !isNullOrUndefined(item.incomes)
    ) {
      incomeExpenseCategories.total = item.incomes.total;
      incomeExpenseCategories.previousTotal = item.incomes.previousTotal;
      incomeExpenseCategories.categories = item.incomes.categories;
    } else if (
      categoryType === PFMCategoryType.EXPENSE &&
      !isNullOrUndefined(item.expenses)
    ) {
      incomeExpenseCategories.total = item.expenses.total;
      incomeExpenseCategories.previousTotal = item.expenses.previousTotal;
      incomeExpenseCategories.categories = item.expenses.categories;
    }
  });

  return incomeExpenseCategories;
}

function _getMovementsByCategory(
  _movementsByCategory: MovementsByCategory[],
  categoryCode: string
): PFMMovement[] {
  if (!!!_movementsByCategory) {
    return null;
  }

  return getMovementsByCategory(_movementsByCategory, categoryCode);
}
