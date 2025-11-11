import { Action, createReducer, on } from '@ngrx/store';
import { initialPFMState, PFMState } from '@modules/pfm/store/pfm.state';
import * as actions from './pfm.action';

const featureReducer = createReducer(
  initialPFMState,
  on(actions.reset, (state) => ({
    ...initialPFMState,
    incomeCategories: state.incomeCategories,
    expenseCategories: state.expenseCategories
  })),
  on(actions.resetMovementsByCategory, (state) => ({
    ...state,
    movementsByCategory: []
  })),
  on(actions.fetchIncomeCategoriesSuccess, (state, { categories }) => ({
    ...state,
    incomeCategories: categories
  })),
  on(actions.fetchExpenseCategoriesSuccess, (state, { categories }) => ({
    ...state,
    expenseCategories: categories
  })),
  on(actions.getBalancesSummary, (state) => ({
    ...state,
    balancesWorking: true,
    balancesCompleted: false
  })),
  on(actions.getBalancesSummarySuccess, (state, { balancesSummary }) => ({
    ...state,
    balancesSummary,
    balancesWorking: false,
    balancesCompleted: true
  })),
  on(actions.getBalancesSummaryError, (state) => ({
    ...state,
    balancesWorking: false,
    balancesCompleted: false
  })),
  on(actions.fetchCategoriesOfMovements, (state) => ({
    ...state,
    categoriesOfMovementsWorking: true,
    categoriesOfMovementsCompleted: false
  })),
  on(
    actions.fetchCategoriesOfMovementsSuccess,
    (state, { categoriesOfMovements }) => ({
      ...state,
      categoriesOfMovements,
      categoriesOfMovementsWorking: false,
      categoriesOfMovementsCompleted: true
    })
  ),
  on(actions.fetchCategoriesOfMovementsError, (state) => ({
    ...state,
    categoriesOfMovementsWorking: false,
    categoriesOfMovementsCompleted: false
  })),
  on(
    actions.fetchMovementsByCategorySuccess,
    (state, { categoryCode, movements }) => ({
      ...state,
      movementsByCategory: state.movementsByCategory.some(
        (movement) => movement.categoryCode === categoryCode
      )
        ? state.movementsByCategory.map((movement) =>
            movement.categoryCode === categoryCode
              ? {
                  categoryCode: movement.categoryCode,
                  movements
                }
              : movement
          )
        : [
            ...state.movementsByCategory,
            {
              categoryCode,
              movements
            }
          ]
    })
  ),
  on(actions.fetchMovementsByCategoryError, (state, { categoryCode }) => ({
    ...state,
    movementsByCategory: state.movementsByCategory.some(
      (movement) => movement.categoryCode === categoryCode
    )
      ? [...state.movementsByCategory]
      : [
          ...state.movementsByCategory,
          {
            categoryCode,
            movements: []
          }
        ]
  })),
  on(actions.adviserStartConversation, (state) => ({
    ...state,
    adviserAval: {
      ...state.adviserAval,
      working: true
    }
  })),
  on(actions.adviserStartConversationSuccess, (state, { accessToken }) => ({
    ...state,
    adviserAval: {
      ...state.adviserAval,
      working: false,
      completed: true,
      accessToken
    }
  })),
  on(actions.adviserStartConversationError, (state) => ({
    ...state,
    adviserAval: {
      ...state.adviserAval,
      working: false,
      completed: false
    }
  }))
);

export const pfmReducer = (state: PFMState, action: Action): PFMState => {
  return featureReducer(state, action);
};
