import { DEFAULT_MOVEMENTS_FILTERS } from '@modules/movement/constants/movement.constants';
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './movement.actions';
import { initialMovementState, MovementState } from './movement.state';

const featureReducer = createReducer(
  initialMovementState,
  on(actions.fetchMovementsAction, (state: MovementState) => ({
    ...state,
    movements: {
      ...state.movements,
      movements: null,
      working: true,
      completed: false
    }
  })),
  on(
    actions.fetchMovementsSuccessAction,
    (state: MovementState, { movements }) => ({
      ...state,
      movements: {
        ...state.movements,
        movements,
        working: false,
        completed: true
      }
    })
  ),
  on(
    actions.fetchMovementsErrorAction,
    (state: MovementState, { message }) => ({
      ...state,
      movements: {
        ...state.movements,
        working: false,
        completed: false
      }
    })
  ),
  on(
    actions.fetchMovementsDetailAction,
    (state: MovementState, { payload }) => ({
      ...state,
      movementsDetail: {
        ...state.movementsDetail,
        payload,
        response: null,
        working: true,
        completed: false
      },
      movementsHistory: {
        ...state.movementsHistory,
        payload,
        response: null,
        working: true,
        completed: false
      }
    })
  ),
  on(
    actions.fetchMovementsDetailSuccessAction,
    (state: MovementState, { response }) => ({
      ...state,
      movementsDetail: {
        ...state.movementsDetail,
        response,
        working: false,
        completed: true
      },
      movementsHistory: {
        ...state.movementsHistory,
        response,
        working: false,
        completed: true
      }
    })
  ),
  on(
    actions.fetchMovementsDetailErrorAction,
    (state: MovementState, { message }) => ({
      ...state,
      movementsDetail: {
        ...state.movementsDetail,
        working: false,
        completed: false
      },
      movementsHistory: {
        ...state.movementsHistory,
        working: false,
        completed: true
      }
    })
  ),
  on(actions.resetMovementsDetailAction, (state: MovementState) => ({
    ...state,
    movementsDetail: {
      payload: null,
      response: null,
      working: false,
      completed: false
    },
    movementsHistory: {
      payload: null,
      response: null,
      infiniteScroll: null,
      working: false,
      completed: false,
      workingMore: false
    }
  })),
  on(actions.fetchMoreMovementsDetailAction, (state: MovementState) => ({
    ...state,
    movementsHistory: {
      ...state.movementsHistory,
      payload: {
        ...state.movementsHistory.payload,
        params: {
          ...state.movementsHistory.payload.params,
          ...(state.movementsHistory.payload.params.page *
            state.movementsHistory.payload.params.pageSize <
          state.movementsHistory.response.totalResults
            ? {
                page: state.movementsHistory.payload.params.page + 1,
                refreshMovements: false
              }
            : {})
        }
      },
      workingMore: true
    }
  })),
  on(
    actions.fetchMovementsWithFiltersAction,
    (state: MovementState, { params }) => ({
      ...state,
      movementsHistory: {
        ...state.movementsHistory,
        payload: {
          ...state.movementsHistory.payload,
          params: {
            ...state.movementsHistory.payload.params,
            ...DEFAULT_MOVEMENTS_FILTERS,
            ...params
          }
        },
        response: null,
        working: true,
        completed: false
      }
    })
  ),
  on(
    actions.fetchMovementsHistorySuccessAction,
    (state: MovementState, { response }) => ({
      ...state,
      movementsHistory: {
        ...state.movementsHistory,
        response,
        working: false,
        completed: true,
        workingMore: false
      }
    })
  ),
  on(
    actions.fetchMovementsHistoryErrorAction,
    (state: MovementState, { message }) => ({
      ...state,
      movementsHistory: {
        ...state.movementsHistory,
        message,
        working: false,
        completed: false,
        workingMore: false
      }
    })
  ),
  on(actions.resetMovementsHistoryAction, (state: MovementState) => ({
    ...state,
    movementsHistory: {
      ...state.movementsDetail,
      infiniteScroll: null,
      working: false,
      workingMore: false
    }
  }))
);

export const movementReducer = (
  state: MovementState,
  action: Action
): MovementState => {
  return featureReducer(state, action);
};
