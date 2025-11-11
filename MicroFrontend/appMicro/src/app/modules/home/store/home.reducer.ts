import { ProductCategory } from '@commons/entities/product/balance.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  HomeAlertType,
  HOME_ALERT_ICONS
} from '../entities/home-alert.entities';
import * as actions from './home.actions';
import { HomeState, initialHomeState } from './home.state';

const featureReducer = createReducer(
  initialHomeState,
  on(
    actions.setProductCategoryFilterAction,
    (state: HomeState, { category }) => ({
      ...state,
      balanceCategory:
        state.balanceCategory === category ? ProductCategory.all : category
    })
  ),
  on(actions.putHomeAlertAction, (state: HomeState, { alert }) => ({
    ...state,
    homeAlerts: [
      ...state.homeAlerts,
      {
        type: alert?.type ? alert.type : HomeAlertType.INFO,
        icon: !!alert.type
          ? HOME_ALERT_ICONS[alert.type]
          : HOME_ALERT_ICONS[HomeAlertType.INFO],
        ...alert
      }
    ].sort((a, b) => b.priority - a.priority)
  })),
  on(actions.removeHomeAlertAction, (state: HomeState, { id }) => ({
    ...state,
    homeAlerts: [...state.homeAlerts.filter((al) => al.id !== id)].sort(
      (a, b) => b.priority - a.priority
    )
  })),
  on(actions.setHomeTimerAction, (state: HomeState, { time }) => ({
    ...state,
    timer: time
  })),
  on(
    actions.setHomeCreditProductsErrorAction,
    (state: HomeState, { creditProductsError }) => ({
      ...state,
      creditProductsError
    })
  ),
  on(
    actions.setHomeHasCreditProductsAction,
    (state: HomeState, { hasCreditProducts }) => ({
      ...state,
      hasCreditProducts
    })
  )
);

export const homeReducer = (state: HomeState, action: Action): HomeState => {
  return featureReducer(state, action);
};
