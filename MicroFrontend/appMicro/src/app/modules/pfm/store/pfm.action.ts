import { createAction, props } from '@ngrx/store';
import {
  PFMBalance,
  PFMCategoriesOfMovements,
  PFMCategory,
  PFMChangeCategoryPayload,
  PFMFilterBalanceSummaryPayload,
  PFMFilterCategoriesOfMovements,
  PFMMovement,
  PFMMovementByCategoryFilterPayload,
  PFMProductTypeEnum
} from '@modules/pfm/entities/pfm.interface';
import { ToastProperties } from '@commons/entities/toast/toast.entities';

export const fetchIncomeCategories = createAction(
  '[PFM] Fetch Income Categories',
  props<{ productType: PFMProductTypeEnum }>()
);

export const fetchIncomeCategoriesSuccess = createAction(
  '[PFM] Fetch Income Categories Success',
  props<{ categories: PFMCategory[] }>()
);

export const fetchIncomeCategoriesError = createAction(
  '[PFM] Fetch Income Categories Error'
);

export const fetchExpenseCategories = createAction(
  '[PFM] Fetch Expense Categories',
  props<{ productType: PFMProductTypeEnum }>()
);

export const fetchExpenseCategoriesSuccess = createAction(
  '[PFM] Fetch Expense Categories Success',
  props<{ categories: PFMCategory[] }>()
);

export const fetchExpenseCategoriesError = createAction(
  '[PFM] Fetch Expense Categories Error'
);

export const getBalancesSummary = createAction(
  '[PFM] Get Balances Summary',
  props<{ filters: PFMFilterBalanceSummaryPayload }>()
);

export const getBalancesSummarySuccess = createAction(
  '[PFM] Get Balances Summary Success',
  props<{ balancesSummary: PFMBalance[] }>()
);

export const getBalancesSummaryError = createAction(
  '[PFM] Get Balances Summary Error'
);

export const fetchCategoriesOfMovements = createAction(
  '[PFM] Fetch Categories Of Movements',
  props<{ filters: PFMFilterCategoriesOfMovements }>()
);

export const fetchCategoriesOfMovementsSuccess = createAction(
  '[PFM] Fetch Categories Of Movements Success',
  props<{ categoriesOfMovements: PFMCategoriesOfMovements[] }>()
);

export const fetchCategoriesOfMovementsError = createAction(
  '[PFM] Fetch Categories Of Movements Error'
);

export const fetchMovementsByCategory = createAction(
  '[PFM] Fetch Movements By Category',
  props<{
    filters: PFMMovementByCategoryFilterPayload;
  }>()
);

export const fetchMovementsByCategorySuccess = createAction(
  '[PFM] Fetch Movements By Category Success',
  props<{ categoryCode: string; movements: PFMMovement[] }>()
);

export const fetchMovementsByCategoryError = createAction(
  '[PFM] Fetch Movements By Category Error',
  props<{ categoryCode: string }>()
);

export const changeCategory = createAction(
  '[PFM] Change Category',
  props<{ changeCategoryPayload: PFMChangeCategoryPayload }>()
);

export const changeCategorySuccess = createAction(
  '[PFM] Change Category Success',
  props<{ props: ToastProperties }>()
);

export const changeCategoryError = createAction(
  '[PFM] Change Category Error',
  props<{ props: ToastProperties }>()
);

export const reset = createAction('[PFM] Reset');

export const resetMovementsByCategory = createAction(
  '[PFM] Reset Movements By Category'
);

export const adviserStartConversation = createAction(
  '[PFM] ADVISER_START_CONVERSATION'
);

export const adviserStartConversationSuccess = createAction(
  '[PFM] ADVISER_START_CONVERSATION_SUCCESS',
  props<{ accessToken: string }>()
);

export const adviserStartConversationError = createAction(
  '[PFM] ADVISER_START_CONVERSATION_ERROR'
);
