import * as actions from '@modules/aval/store/aval.actions';
import { AvalState, initialAvalState } from '@modules/aval/store/aval.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialAvalState,
  on(actions.fetchAvalProductsAction, (state: AvalState) => ({
    ...state,
    products: {
      data: null,
      working: true,
      completed: false
    }
  })),
  on(actions.fetchAvalProductsSuccessAction, (state: AvalState, { data }) => ({
    ...state,
    products: {
      data,
      working: false,
      completed: true
    }
  })),
  on(actions.fetchAvalProductsErrorAction, (state: AvalState) => ({
    ...state,
    products: {
      data: null,
      working: false,
      completed: false
    }
  })),
  on(actions.fetchTuplusProductsAction, (state: AvalState) => ({
    ...state,
    tuplus: {
      data: null,
      working: true,
      completed: false
    }
  })),
  on(
    actions.fetchTuplusProductsSuccessAction,
    (state: AvalState, { data }) => ({
      ...state,
      tuplus: {
        data,
        working: false,
        completed: true
      }
    })
  ),
  on(actions.fetchTuplusProductsErrorAction, (state: AvalState) => ({
    ...state,
    tuplus: {
      data: null,
      working: false,
      completed: false
    }
  })),
  on(actions.fetchAvalStocksAction, (state: AvalState) => ({
    ...state,
    stocks: {
      data: null,
      working: true,
      completed: false
    }
  })),
  on(actions.fetchAvalStocksSuccessAction, (state: AvalState, { data }) => ({
    ...state,
    stocks: {
      data,
      working: false,
      completed: true
    }
  })),
  on(actions.fetchAvalStocksErrorAction, (state: AvalState) => ({
    ...state,
    stocks: {
      data: null,
      working: false,
      completed: false
    }
  })),
  on(actions.fetchAvalStocksDetailAction, (state: AvalState) => ({
    ...state,
    stocksDetail: {
      data: null,
      working: true,
      completed: false
    }
  })),
  on(
    actions.fetchAvalStocksDetailSuccessAction,
    (state: AvalState, { data }) => ({
      ...state,
      stocksDetail: {
        data,
        working: false,
        completed: true
      }
    })
  ),
  on(actions.fetchAvalStocksDetailErrorAction, (state: AvalState) => ({
    ...state,
    stocksDetail: {
      data: null,
      working: false,
      completed: false
    }
  }))
);

export const avalReducer = (state: AvalState, action: Action): AvalState => {
  return featureReducer(state, action);
};
