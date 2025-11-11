import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './bre-b-transfers.actions';
import {
  BreBTransfersState,
  initialBreBTransfersState
} from './bre-b-transfers.state';

const featureReduce = createReducer(
  initialBreBTransfersState,
  on(actions.initiateTransferFromSpiChannel, (state, { spiKey }) => ({
    ...state,
    towardAvalKey: spiKey,
    working: true,
    completed: false
  })),
  on(actions.fetchAccountKeyAction, (state) => ({
    ...state,
    spiKeyData: null,
    working: true,
    completed: false
  })),
  on(actions.fetchAccountKeySuccessAction, (state, { spiKeyData }) => ({
    ...state,
    spiKeyData,
    working: false,
    completed: true
  })),
  on(actions.fetchAccountKeyErrorAction, (state) => ({
    ...state,
    spiKeyData: null,
    working: false,
    completed: true
  })),
  on(actions.clearTowardAvalKey, (state) => ({
    ...state,
    towardAvalKey: ''
  })),
  on(actions.setAddSpiContactPayload, (state, { payload }) => ({
    ...state,
    addSpiContactPayload: payload
  })),
  on(actions.addSpiContactAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(actions.addSpiContactSuccessAction, (state) => ({
    ...state,
    addSpiContactPayload: null,
    working: false,
    completed: true
  })),
  on(actions.addSpiContactErrorAction, (state) => ({
    ...state,
    addSpiContactPayload: null,
    working: false,
    completed: true
  })),
  on(actions.fetchSpiContactAction, (state) => ({
    ...state,
    spiContact: null,
    working: true,
    completed: false
  })),
  on(actions.fetchSpiContactSuccessAction, (state, { spiContact }) => ({
    ...state,
    spiContact,
    working: false,
    completed: true
  })),
  on(actions.fetchSpiContactErrorAction, (state) => ({
    ...state,
    working: false,
    completed: true
  })),
  on(actions.fetchGMFAction, (state) => ({
    ...state,
    gmf: null,
    working: false,
    completed: true
  })),
  on(actions.fetchGMFSuccessAction, (state, { gmf }) => ({
    ...state,
    gmf,
    working: false,
    completed: true
  })),
  on(actions.fetchGMFErrorAction, (state) => ({
    ...state,
    working: false,
    completed: true
  }))
);

export const breBTransfersReducer = (
  state: BreBTransfersState,
  action: Action
): BreBTransfersState => featureReduce(state, action);
