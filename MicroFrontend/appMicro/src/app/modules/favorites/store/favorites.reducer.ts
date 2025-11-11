import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './favorites.actions';
import { initialFavoritesState, FavoritesState } from './favorites.state';

const featureReducer = createReducer(
  initialFavoritesState,
  on(actions.fetchFavoritesAction, (state: FavoritesState) => ({
    ...state,
    favorites: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchFavoritesSuccessAction,
    (state: FavoritesState, { favorites }) => ({
      ...state,
      favorites,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchFavoritesErrorAction,
    (state: FavoritesState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(
    actions.fetchTowardProductsByPhoneNumberAction,
    (state: FavoritesState) => ({
      ...state,
      working: true
    })
  ),
  on(
    actions.fetchTowardProductsByPhoneNumberSuccessAction,
    (state: FavoritesState, { towardProducts }) => ({
      ...state,
      towardProducts,
      towardBankIds: towardProducts.map(
        (product) => product.account.bankInfo.bankId
      ),
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchTowardProductsByPhoneNumberErrorAction,
    (state: FavoritesState, { message }) => ({
      ...state,
      towardProducts: [],
      towardBankIds: [],
      working: false,
      completed: true,
      message
    })
  )
);

export const favoritesReducer = (
  state: FavoritesState,
  action: Action
): FavoritesState => {
  return featureReducer(state, action);
};
