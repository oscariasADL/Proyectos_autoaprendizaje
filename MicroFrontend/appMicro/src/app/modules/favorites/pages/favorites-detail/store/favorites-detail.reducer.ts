import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './favorites-detail.actions';
import {
  initialFavoriteDetailState,
  FavoritesDetailState
} from './favorites-detaill.state';

const featureReducer = createReducer(
  initialFavoriteDetailState,
  on(actions.fetchFavoriteDetailAction, (state: FavoritesDetailState) => ({
    ...state,
    favorite: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchFavoriteDetailSuccessAction,
    (state: FavoritesDetailState, { favorite }) => ({
      ...state,
      favorite,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchFavoriteDetailErrorAction,
    (state: FavoritesDetailState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(
    actions.setFavoriteDetailAction,
    (state: FavoritesDetailState, { favorite }) => ({
      ...state,
      favorite,
      working: false,
      completed: true
    })
  )
);

export const favoritesDetailReducer = (
  state: FavoritesDetailState,
  action: Action
): FavoritesDetailState => {
  return featureReducer(state, action);
};
